import { upsertStreamUser } from "../db/stream.js";
import { User } from "../Models/UserModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt'

export const registerUser = TryCatch(async(req, res) => {
    const {name,mobileno, email, password} = req.body;
    if(!name || !email || !password || !mobileno){
        return res.json({
            success: false,
            message: "Fill All Field"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.json({
            success: false,
            message: "Invalid email format"
        })
    }

    let user = await User.findOne({email});

    if(user){
        return res.status(200).json({
            success: false,
            message: "User Already Exists"
        })
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        mobileno,
        email,
        password: hashPassword,
        profilepic: randomAvatar
   });

   try {
    await upsertStreamUser({
    id: user._id.toString(),
    name: user.name,
    image: user.profilepic || ""
   })
   console.log(`Stream user created for ${user._id}`);
   } catch (error) {
    console.log("Error creating stream user:", error);
   }
   
    generateToken(user._id, res);

    return res.status(200).json({
        user,
        success: true,
        message: "Your Account is Created"
    })
})

export const loginUser = TryCatch(async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.json({
            success: false,
            message: "User Doesn't Exists"
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        return res.json({
            success: false,
            message: "Wrong Password"
        })
    }
    generateToken(user._id, res);
    return res.status(200).json({
        success: true,
        user,
        message: "Loggin Successfully"
    })
})

export const logoutUser = TryCatch(async(req, res) => {
    res.cookie("token", "", {maxAge: 0});
    const user = await User.findById(req.user._id);
    return res.json({
        success: true,
        message: "Logged Out Successfully",
    })
})

export const UserProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
})

export const onboard = TryCatch(async(req, res) => {
    const userId = req.user._id;
    const {name, bio, nativeLanguage, learningLanguage, location} = req.body;
    
    if(!name || !bio || !nativeLanguage || !learningLanguage || !location){
        return res.json({
            success: false,
            message: "All field are required",
            missingFields: [
                !name && "name",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !location && "location"
            ].filter(Boolean),
        })
    }

   const updateUser = await User.findByIdAndUpdate(userId, {
    ...req.body,
    isOnBoarded: true,
    }, {new: true})

    if(!updateUser){
        return res.json({
            success: false,
            message: "User not found"
        })
    }

    try {
        await upsertStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.name,
        image: updateUser.profilepic || ""
    })
    console.log(`Stream user created for ${updateUser.name}`);
   } catch (error) {
    console.log("Error creating stream user:", error);
   }
    
    return res.json({
        updateUser,
        success: true,
        message:"Data updated"
    })
})