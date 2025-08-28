import { StreamChat } from "stream-chat";

const apikey = process.env.STREAM_API_KEY;
const apisecret = process.env.STREAM_API_SECRET;

if(!apikey || !apisecret){
    console.log("stream api key or secret missing");
} 

const streamClient = StreamChat.getInstance(apikey, apisecret);

export const upsertStreamUser = async(userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.log("Error creating Stream user:", error);
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating stream token:", error);
    }
}