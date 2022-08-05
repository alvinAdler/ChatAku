const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

const UserModel = require("../models/UserModel")

const tokenVerif = require("../middlewares/tokenVerif")

const SALT_ROUND = 10

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

router.post("/tokenChecker", tokenVerif, (req, res) => {
    return res.status(200).json({
        message: "User is authenticated",
        user: req.user
    })
})

module.exports = router