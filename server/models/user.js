import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   logged: {
      type: Boolean,
      required: true
   },
   createdAt: {
      type: Date,
      required: true,
      default: Date.now,
   }
})

export default mongoose.model("User", userSchema)