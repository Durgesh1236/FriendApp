import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Channel,
  ChannelHeader,
  Chat as StreamChatComponent,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { toast } from "react-toastify";
import CallButton from '../components/CallButton';
import ChatLoader from '../components/ChatLoader';
import { UserData } from "../context/User";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const Chat = () => {
  const { id: targetUserId } = useParams();
  const {
    user: authUser,
    tokenData,
    getChatToken,
    userChat,
    setUserChat
  } = UserData();
//  console.log(tokenData);
 
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChatToken(); 
  }, []);

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.name,
            image: authUser.profilepic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setUserChat(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = async () => {
    if (channel) {
      try {
        // Request video call token from backend
        const data = tokenData.token;
        // console.log(data);
        
        // const data = await response.json();
        // if (!data.token) throw new Error("Failed to create stream token");
        // Include token in call URL
        const callUrl = `${window.location.origin}/call/${channel.id}?token=${data}`;
        // console.log(callUrl);
        
        await channel.sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        });
        toast.success("Video call link sent!");
      } catch (error) {
        toast.error(error.message || "error in call function");
        console.log(error);
      }
    }
  }

  if (loading || !userChat || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <StreamChatComponent client={userChat}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </StreamChatComponent>
    </div>
  );
};

export default Chat;
