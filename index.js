require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRouter = require("./routes/userRoutes")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to the database"))

app.use("/users", userRouter)

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server started on port ${process.env.PORT_NUMBER}`)
})