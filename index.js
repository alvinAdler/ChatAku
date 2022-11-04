require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { Server } = require("socket.io")
const { createServer } = require("http")

const userRouter = require("./routes/userRoutes")
const RoomModel = require("./models/RoomModel")

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: ["http://localhost:3000"]
})

io.on("connection", (socket) => {
    console.log("Connected to socket")
    console.log(socket.id)
    console.log("===============")
})

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to the database"))

app.use("/users", userRouter)

httpServer.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server started on port ${process.env.PORT_NUMBER}`)
})