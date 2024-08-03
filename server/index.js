import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

mongoose.set("debug", true)

mongoose.connect(process.env.DATABASE_URL)
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Error connecting to MongoDB:", err))

import usersRoute from "./routes/users.js"
app.use('/innovent', usersRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server Started at localhost:5000/innovent'))