import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";

export const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(403).json({
                message: "Please Login"
            })
        }
        const decodedData = jwt.verify(token, process.env.jwt_secret);

        if(!decodedData){
            return res.status(200).json({
                message: "token expired"
            })
        }

        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Please Login"
        })
    }
}