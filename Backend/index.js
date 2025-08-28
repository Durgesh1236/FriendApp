import express from "express"
import 'dotenv/config'
import cloudinary from 'cloudinary'
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";
import routerAuth from "./routes/authRoute.js";
import chatRouter from "./routes/chatRoutes.js";

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api,
    api_secret: process.env.cloud_secret,
});

const app = express();
const port = process.env.PORT;

//using middlewares
app.use(express.json());
app.use(cookieParser())

//import route
app.use("/api/user", router);
app.use("/api/auth", routerAuth);
app.use("/api/chat", chatRouter)

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
    connectDB();
})