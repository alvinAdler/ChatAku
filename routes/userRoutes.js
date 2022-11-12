const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

const UserModel = require("../models/UserModel")
const RoomModel = require("../models/RoomModel")

const tokenVerif = require("../middlewares/tokenVerif")

const { generateHsl } = require("../utilityFunctions")

const SALT_ROUND = 10
const ALLOWED_REQUEST_METHOD = {
    REJECT: "REJECT",
    ACCEPT: "ACCEPT"
}

router.post("/register", async (req, res) => {

    const { avatarName, firstName, lastName, username, password } = req.body
    const chatColor = generateHsl()

    if(!avatarName || !firstName || !lastName || !username || !password){
        return res.status(400).json({
            message: "Undefined value detected"
        })
    }

    const allUsers = await UserModel.countDocuments({username: username})

    if(allUsers > 0){
        return res.status(400).json({
            message: `Username \"${username}\" is already registered`
        })
    }

    let hashedPassword
    try{
        hashedPassword = await bcrypt.hash(password, SALT_ROUND)
    }
    catch(err){
        return res.status(500).json({
            messsage: "Failed to generate password"
        })
    }

    try{
        const result = await UserModel.create({avatarName, firstName, lastName, username, chatColor, password: hashedPassword})

        return res.status(200).json({
            message: "Successfully registered user",
            user: result
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Failed to register user",
            error: err
        })
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    if([username, password].some((item) => item === undefined || item === null)){
        return res.status(400).json({
            message: "Bad data. A property is either undefined or null"
        })
    }

    let targetUser

    try{
        targetUser = await UserModel.findOne({username: username})
        if(targetUser === null){
            throw new Error("Can not find username with this ID")
        }
    }catch(err){
        return res.status(500).json({
            message: "Failed to find user",
            error: `${err}`
        })
    }

    try{
        const result = await bcrypt.compare(password, targetUser.password)
        if(!result){
            throw new Error("Password incorrect")
        }
    }catch(err){
        return res.status(400).json({
            message: "Password does not match"
        })
    }

    const { _id } = targetUser

    const authToken = jwt.sign({_id, username}, process.env.AUTH_TOKEN, {expiresIn: "1h"})

    return res.status(200).json({
        message: "Success",
        authToken
    })
})

router.get("/findUsers", tokenVerif, async(req, res) => {
    const { keyword } = req.query

    if(keyword === undefined || keyword ===  null){
        return res.status(400).json({
            message: "No keyword provided"
        })
    }

    try{
        const foundUsers = await UserModel.find({username: {$regex: keyword, $options: "gi"}, _id: {$ne: req.user._id}}, "username avatarName firstName lastName")
        const currentUser = await UserModel.findOne({_id: req.user._id})

        const users = foundUsers.map((user) => {
            const modUser = user.toObject()

            //Determining the status of the user

            if(currentUser.friendsList.includes(modUser._id)){
                modUser.status = "FRIEND"
            }else if(currentUser.requestList.includes(modUser._id)){
                modUser.status = "REQUESTING"
            }else{
                modUser.status = "STRANGER"
            }

            return modUser
        })

        return res.status(200).json({
            message: "Users found",
            users
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to search users",
            err: `${err}`
        })
    }
})

router.get("/getRequests", tokenVerif, async (req, res) => {
    try{
        const currentUser = await UserModel.findOne({_id: req.user._id}).populate({
            path: "requestList",
            select: "username firstName lastName avatarName"
        })

        const requestList = currentUser.requestList.map((user) => {
            const tempUser = user.toObject()
            tempUser.status = "REQUESTING"

            return tempUser
        })

        return res.status(200).json({
            message: "Successfully get the request list",
            requestList
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to get requests list",
            err: `${err}`
        })
    }
})

router.post("/sendRequest", tokenVerif, async (req, res) => {
    const { targetUserId } = req.body

    if(targetUserId === undefined || targetUserId === null){
        return res.status(400).json({
            message: "No target user provided."
        })
    }

    const currentUser = await UserModel.findOne({_id: req.user._id})

    if(targetUserId === req.user._id || currentUser.friendsList.includes(targetUserId)){
        return res.status(400).json({
            message: "Can not add a request towards self or a user who already on the friends list"
        })
    }

    //The ID of the user who request a friendship will be put
    //into the request list of the target
    try{
        const resTargetUser = await UserModel.updateOne({_id: targetUserId}, {$addToSet: {requestList: req.user._id}})

        if(resTargetUser.acknowledged){
            return res.status(200).json({
                message: "Request sent"
            })
        }

        throw new Error("Failed to modify both user's request list")
    }catch(err){
        return res.status(400).json({
            message: "Unable to send request",
            err: `${err}`
        })
    }
})

router.get("/getFriends", tokenVerif, async(req, res) => {
    try{
        const currentUser = await UserModel.findOne({_id: req.user._id}).populate({
            path: "friendsList",
            select: "username firstName lastName avatarName"
        })

        const friendsList = currentUser.friendsList.map((friend) => {
            const tempFriend = friend.toObject()
            tempFriend.status = "FRIEND"

            return tempFriend
        })

        return res.status(200).json({
            message: "Successfully get the friends list",
            friendsList
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to get friends list",
            err: `${err}`
        })
    }
})

router.patch("/deleteFriend", tokenVerif, async(req, res) => {
    const { targetUserId } = req.body

    if(targetUserId === undefined){
        return res.status(400).json({
            message: "No target user ID provided"
        })
    }

    try{
        const resCurrentUser = await UserModel.updateOne({_id: req.user._id, friendsList: targetUserId}, {$pull: {"friendsList": targetUserId}})
        const resTargetUser = await UserModel.updateOne({_id: targetUserId, friendsList: req.user._id}, {$pull: {"friendsList": req.user._id}})

        if([resCurrentUser, resTargetUser].every((item) => item.acknowledged && item.modifiedCount > 0)){
            return res.status(200).json({
                message: "Successfully removed a friend from the list"
            })
        }

        throw new Error("One process was not acknowledged")

    }catch(err){
        return res.status(500).json({
            message: "Failed to remove a friend from the list",
            err: `${err}`
        })
    }
})

router.post("/handleRequestStatus", tokenVerif, async(req, res) => {
    const { targetUserId, action } = req.body

    if([targetUserId, action].some((item) => item === null || item === undefined)){
        return res.status(400).json({
            message: "Undefined or null element detected"
        })
    }

    switch(action.toUpperCase()){
        case ALLOWED_REQUEST_METHOD.ACCEPT:
            //Move the users' ID from the request list to the friends list
            try {
                //Check if there is a user with ID targetUserId in the request list
                const requestCount = await UserModel.countDocuments({_id: req.user._id, requestList: targetUserId})

                if(requestCount < 1){
                    return res.status(400).json({
                        message: "Can not accept a request that does not exist"
                    })
                }

                const resTargetUser = await UserModel.updateOne({_id: targetUserId}, {
                    $push: {"friendsList": req.user._id},
                    $pull: {"requestList": req.user._id}
                })

                const resCurrentUser = await UserModel.updateOne({_id: req.user._id}, {
                    $push: {"friendsList": targetUserId},
                    $pull: {"requestList": targetUserId}
                })

                if([resTargetUser, resCurrentUser].every((item) => item.acknowledged && item.modifiedCount > 0)){
                    return res.status(200).json({
                        message: "Successfully accept the friend request"
                    })
                }

                return res.status(200).json({
                    message: "Successfully accepted the friend request",
                    warning: "One process was not acknowledged"
                })

            } catch (err) {
                return res.status(500).json({
                    message: "Failed to accept the user's request",
                    err: `${err}`
                })
            }

        case ALLOWED_REQUEST_METHOD.REJECT:
            //Delete the users' ID from the request list
            try {    
                const resCurrentUser = await UserModel.updateOne({_id: req.user._id, requestList: targetUserId}, {
                    $pull: {"requestList": targetUserId}
                })

                if(resCurrentUser.acknowledged && resCurrentUser.modifiedCount > 0){
                    return res.status(200).json({
                        message: "Successfully rejected the friend request"
                    })
                }

                throw new Error("One process was not acknowledged")

            } catch (err) {
                return res.status(500).json({
                    message: "Failed to reject the user's request",
                    err: `${err}`
                })
            }
        default:
            return res.status(400).json({
                message: "Action is not valid"
            })
    }
})

router.post("/tokenChecker", tokenVerif, async (req, res) => {

    const currentUser = await UserModel.findOne({_id: req.user._id}, {_id: 0, password: 0}).populate({
        path: "friendsList",
        select: "username firstName lastName avatarName"
    }).populate({
        path: "requestList",
        select: "username firstName lastName avatarName"
    })
    .populate({
        path: "chatList",
        populate: {
            path: "participants",
            select: "username firstName lastName avatarName"
        }
    })

    const friendsList = currentUser.friendsList.map((friend) => {
        const tempFriend = friend.toObject()
        tempFriend.status = "FRIEND"

        return tempFriend
    })

    const requestList = currentUser.requestList.map((user) => {
        const tempUser = user.toObject()
        tempUser.status = "REQUESTING"

        return tempUser
    })
    
    const newUser = currentUser.toObject()
    delete newUser.friendsList
    delete newUser.requestList

    return res.status(200).json({
        message: "User is authenticated",
        friendsList, requestList,
        currentUser: newUser
    })
})

router.post("/addChat", tokenVerif, async (req, res) => {
    const { targets } = req.body

    //TODO: Before creating a room, check if a room with the same users already exists.

    //Creating a room
    let roomCreationRes

    try{
        roomCreationRes = await (await RoomModel.create({participants: [...targets.map((target) => target._id), req.user._id]})).populate({
            path: "participants",
            select: "_id username firstName lastName avatarName chatColor"
        })
    }catch(err){
        return res.status(500).json({
            message: "Failed to create room"
        })
    }

    //Adding the current room ID to every participant
    try{
        const updateResult = await UserModel.updateMany({_id: {$in: roomCreationRes.participants}}, {$push: {chatList: roomCreationRes._id}})
        
        if(updateResult.acknowledged){
            return res.status(200).json({
                message: "Successfully created a room",
                room: roomCreationRes
            })
        }

        throw new Error("Failed to add room ID to the participants")
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Failed to add room ID's to the participants",
            err: `${err}`
        })
    }

})

router.get("/getChat/:chatId", tokenVerif, async (req, res) => {
    const { chatId } = req.params

    let result

    try{
        result = await RoomModel.findOne({_id: chatId}).populate({
            path: "participants",
            select: "_id avatarName firstName lastName username chatColor"
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Error while finding chat"
        })
    }

    return res.status(200).json({
        chat: result
    })
})

router.delete("/deleteChat", tokenVerif, async (req, res) => {
    const { chatId } = req.body

    if(chatId === undefined){
        return res.status(400).json({
            message: "Chat ID must be provided"
        })
    }

    try{
        const result = await RoomModel.deleteOne({_id: chatId})
        const updateResult = await UserModel.updateMany({chatList: chatId}, {$pull: {chatList: chatId}})

        if(result.deletedCount > 0 && updateResult.modifiedCount > 0){
            return res.status(200).json({
                message: "Chat has been deleted successfully",
                chatId
            })
        }

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Failed to delete chat",
            err
        })
    }

})

module.exports = router