import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileno: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    thumbnail: {
        id: String,
        url: String,
     },
     profilepic:{
        type: String,
        default: ""
     },
     bio: {
        type: String,
        default: "",
     },
     nativeLanguage: {
        type: String,
        default: "",
     },
     learningLanguage: {
        type: String,
        default: "",
     },
     location: {
        type: String,
        default: "",
     },
     isOnBoarded: {
        type: Boolean,
        default: false,
     },
     friend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
     ]
}, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema)