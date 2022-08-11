const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    avatarName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friendsList: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "users"
    },
    requestList: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "users"
    }
}, {versionKey: false})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel