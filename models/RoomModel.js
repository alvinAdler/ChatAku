const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.ObjectId],
        required: true,
        default: [],
        ref: "users"
    },
    chatHistory: {
        type: [Object],
        required: true,
        default: []
    }
}, {versionKey: false})

const RoomModel = mongoose.model("rooms", RoomSchema)

module.exports = RoomModel