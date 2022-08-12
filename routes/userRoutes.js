const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

const UserModel = require("../models/UserModel")

const tokenVerif = require("../middlewares/tokenVerif")

const SALT_ROUND = 10
const ALLOWED_REQUEST_METHOD = {
    REJECT: "reject",
    ACCEPT: "accept"
}

router.post("/register", async (req, res) => {

    const { avatarName, firstName, lastName, username, password } = req.body

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
        const result = await UserModel.create({avatarName, firstName, lastName, username, password: hashedPassword})

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

router.get("/getRequests", tokenVerif, async (req, res) => {
    try{
        const { requestList } = await UserModel.findOne({_id: req.user._id}).populate({
            path: "requestList",
            select: "username firstName lastname avatarName"
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

    //Putting each user's ID into the other's request list
    try{
        const resCurrentUser = await UserModel.updateOne({_id: req.user._id}, {$addToSet: {requestList: targetUserId}})
        const resTargetUser = await UserModel.updateOne({_id: targetUserId}, {$addToSet: {requestList: req.user._id}})

        if(resCurrentUser.acknowledged && resTargetUser.acknowledged){
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
        const { friendsList } = await UserModel.findOne({_id: req.user._id}).populate({
            path: "friendsList",
            select: "username firstName lastname avatarName"
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

    switch(action.toLowerCase()){
        case ALLOWED_REQUEST_METHOD.ACCEPT:
            //Move the users' ID from the request list to the friends list
            try {
                const resTargetUser = await UserModel.updateOne({_id: targetUserId, requestList: req.user._id}, {
                    $push: {"friendsList": req.user._id},
                    $pull: {"requestList": req.user._id}
                })
    
                const resCurrentUser = await UserModel.updateOne({_id: req.user._id, requestList: targetUserId}, {
                    $push: {"friendsList": targetUserId},
                    $pull: {"requestList": targetUserId}
                })

                if([resTargetUser, resCurrentUser].every((item) => item.acknowledged && item.modifiedCount > 0)){
                    return res.status(200).json({
                        message: "Successfully accept the friend request"
                    })
                }

                throw new Error("One process was not acknowledged")

            } catch (err) {
                return res.status(500).json({
                    message: "Failed to accept the user's request",
                    err: `${err}`
                })
            }

        case ALLOWED_REQUEST_METHOD.REJECT:
            //Delete the users' ID from the request list
            try {
                const resTargetUser = await UserModel.updateOne({_id: targetUserId, requestList: req.user._id}, {
                    $pull: {"requestList": req.user._id}
                })
    
                const resCurrentUser = await UserModel.updateOne({_id: req.user._id, requestList: targetUserId}, {
                    $pull: {"requestList": targetUserId}
                })

                if([resTargetUser, resCurrentUser].every((item) => item.acknowledged && item.modifiedCount > 0)){
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

router.post("/tokenChecker", tokenVerif, (req, res) => {
    return res.status(200).json({
        message: "User is authenticated",
        user: req.user
    })
})

module.exports = router