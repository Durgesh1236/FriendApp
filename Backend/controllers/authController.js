import { FriendRequest } from "../Models/friendRequest.js";
import { User } from "../Models/UserModel.js";
import TryCatch from "../utils/TryCatch.js";

export const getRecommendedUsers = TryCatch(async (req, res) => {
    const currentuserId = req.user.id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
        $and: [
            {
                _id: { $ne: currentuserId }
            },
            { _id: { $nin: currentUser.friend } },
            { isOnBoarded: true },
        ]
    })
    return res.json({
        recommendedUsers,
        success: true
    })
})

// export const getRecommendedUsers = TryCatch(async (req, res) => {
//     const currentuserId = req.user.id;

//     // Get current user to access the 'friends' array
//     const currentUser = await User.findById(currentuserId).select("friends");

//     const recommendedUsers = await User.find({
//         _id: { $ne: currentuserId, $nin: currentUser.friends },
//         isOnBoarded: true,
//     });

//     return res.json({
//         recommendedUsers,
//         success: true
//     });
// });


export const getMyFriends = TryCatch(async (req, res) => {
    const user = await User.findById(req.user.id)
        .select("friend")
        .populate("friend", "name profilepic nativeLanguage learningLanguage");
    return res.json(user.friend)
})

// export const sendFriendRequest = TryCatch(async (req, res) => {
//     const myId = req.user.id;
//     const { id: recipientId } = req.params;

//     if (myId === recipientId) {
//         return res.json({
//             success: false,
//             message: "You can't send friend request to yourself"
//         })
//     }
//     const recipient = await User.findById(recipientId);
//     if (!recipient) {
//         return res.json({
//             success: false,
//             message: "Recipient not found"
//         })
//     }

//     if (recipient.friend.includes(myId)) {
//         res.json({
//             success: false,
//             message: "You are already friends with this user"
//         })
//     }
//     const existingRequest = await FriendRequest.findOne({
//         $or: [
//             {
//                 sender: myId,
//                 recipient: recipientId
//             },
//             { sender: recipientId, recipient: myId }
//         ],
//     })
//     if (existingRequest) {
//         return res.json({
//             success: false,
//             message: "A friend request already exists"
//         })
//     }

//     const friendrequest = await FriendRequest.create({
//         sender: myId,
//         recipient: recipientId
//     })
//     return res.json({
//         friendrequest,
//         success: true,
//         message: "Friend Request Sent"
//     })
// })

export const sendFriendRequest = TryCatch(async (req, res) => {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
        return res.json({
            success: false,
            message: "You can't send a friend request to yourself"
        });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
        return res.json({
            success: false,
            message: "Recipient not found"
        });
    }

    if (recipient.friend.includes(myId)) {
        return res.json({
            success: false,
            message: "You are already friends with this user"
        });
    }

    const existingRequest = await FriendRequest.findOne({
        $or: [
            { sender: myId, recipient: recipientId },
            { sender: recipientId, recipient: myId }
        ]
    });

    if (existingRequest) {
        return res.json({
            success: false,
            message: "A friend request already exists"
        });
    }

    const friendrequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId,
    });

    return res.json({
        success: true,
        message: "Friend request sent",
        friendrequest
    });
});


export const acceptFriendRequest = TryCatch(async(req, res) => {
    const {id:requestId} = req.params;
    const friendrequest = await FriendRequest.findById(requestId);
    if(!friendrequest){
        return res.json({
            success: false,
            message: "Friend request not found"
        })
    }

    if(friendrequest.recipient.toString() !== req.user.id){
        return res.json({
            success: false,
            message: "You are not authorized  to accept this request"
        })
    }

    friendrequest.status = "accepted";
    await friendrequest.save();
     
    await User.findByIdAndUpdate(friendrequest.sender,{
        $addToSet: {friend: friendrequest.recipient},
    })

    await User.findByIdAndUpdate(friendrequest.recipient, {
        $addToSet: {friend: friendrequest.sender},
    });
    
    return res.json({
        success: true,
        message: "Friend request accepted"
    })
})

export const getFriendRequest = TryCatch(async(req,res) => {
    const incomingRequest = await FriendRequest.find({
        recipient: req.user.id,
        status: "pending"
    }).populate("sender", "name profilepic nativeLanguage learningLanguage");
    
    const acceptRequest = await FriendRequest.find({
        sender: req.user.id,
        status: "accepted"
    }).populate("recipient", "name profilepic");

     return res.json({
        incomingRequest,
        acceptRequest
    })
});

export const getOutgoingFriendReqs = TryCatch(async(req, res) => {
    const outgoingRequest = await FriendRequest.find({
        sender: req.user.id,
        status: "pending",
    }).populate("sender", "name profilepic nativeLanguage learningLanguage");

    return res.json({
        outgoingRequest,
        success: true,
    }) 
})