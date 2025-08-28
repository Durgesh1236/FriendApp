import express from "express";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/authController.js";
import { isAuth } from "../middlewares/isAuth.js";

const routerAuth = express.Router();
 routerAuth.get("/recommended-friends", isAuth, getRecommendedUsers)
 routerAuth.get("/friends", isAuth, getMyFriends);
 routerAuth.post("/friend-request/:id", isAuth, sendFriendRequest)
 routerAuth.put("/friend-request/:id/accept", isAuth, acceptFriendRequest)
 routerAuth.get("/friend-request", isAuth, getFriendRequest);
 routerAuth.get("/outgoing-friend-requests", isAuth, getOutgoingFriendReqs)
export default routerAuth;