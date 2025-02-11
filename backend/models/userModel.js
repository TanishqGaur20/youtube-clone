import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userId: { type: String  },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Store hashed password
    avatar: { type: String },
    channelName:{type:String,default:""}
});

// Create a user model
const User = mongoose.model("User", userSchema);

export default User;
