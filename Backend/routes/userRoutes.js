import express from "express";
import { loginUser, logoutUser, onboard, registerUser, UserProfile } from "../controllers/UserController.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",isAuth, logoutUser);
router.post("/my-profile", isAuth, UserProfile);
router.post("/onboarding", isAuth, onboard);

export default router;