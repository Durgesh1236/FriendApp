import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url, {
            dbName: "FriendApp",
        })
        console.log("DB connected");
    } catch (error) {
      console.log(error);  
    }
}

export default connectDB