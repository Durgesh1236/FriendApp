import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getStreamToken } from "../controllers/chatController.js";

const chatRouter = express.Router();
  chatRouter.get("/token", isAuth, getStreamToken);

export default chatRouter;