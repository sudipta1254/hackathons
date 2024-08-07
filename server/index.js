import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"

// Models
import usersRoute from "./routes/users.js"
import proposalSchema from "./routes/proposals.js"

const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// Constants
const PORT = process.env.PORT || 5000

// Routes
app.use('/innovent/user', usersRoute)
app.use('/innovent/proposal', proposalSchema)

// Connect to MongoDB & start the server
mongoose.connect(process.env.DATABASE_URL)
   .then(() => {
      console.log("Connected to MongoDB")
      app.listen(PORT, () => console.log('Server Started'))
   })
   .catch(err => console.error("Error connecting to MongoDB:", err))
