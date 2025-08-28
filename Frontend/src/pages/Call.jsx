import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import PageLoader from "../components/PageLoader";
import { UserData } from "../context/User";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const Call = () => {
  const { id: callId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  
  const { user: authUser, getChatToken } = UserData();

  const { 
    data: tokenData, 
    error: tokenError,
    isLoading: isTokenLoading 
  } = useQuery({
    queryKey: ["streamToken", authUser?._id],
    queryFn: async () => {
      if (!authUser?._id) {
        throw new Error("User not authenticated");
      }
      const token = await getChatToken();
      console.log(token);
      
      if (!token) {
        throw new Error("Failed to get stream token");
      }
      return token;
    },
    enabled: !!authUser,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (tokenError) {
      toast.error(tokenError.message);
      setIsConnecting(false);
      navigate("/");
    }
  }, [tokenError, navigate]);

  useEffect(() => {
    const initVideoCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        setIsConnecting(true);
        
        const user = {
          id: authUser._id,
          name: authUser.name,
          image: authUser.profilepic,
        };

        // Initialize Stream Video Client
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        // Create and join the call
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Call initialization failed:", error);
        toast.error(error.message || "Failed to join call");
        navigate("/");
      } finally {
        setIsConnecting(false);
      }
    };

    initVideoCall();

    return () => {
      // Cleanup function
      if (call) {
        call.leave().catch(err => {
          console.error("Error leaving call:", err);
        });
      }
      if (client) {
        client.disconnectUser();
      }
    };
  }, [tokenData, authUser, callId, navigate]);

  if (!authUser || isTokenLoading || isConnecting) {
    return <PageLoader />;
  }

  if (!client || !call) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-red-600">
          Failed to initialize video call. Please check your connection and try again.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallContent />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-lg font-medium">Connecting to call...</div>
      </div>
    );
  }

  return (
    <StreamTheme>
      <div className="w-full h-full flex flex-col bg-white">
        <SpeakerLayout />
        <div className="p-4 border-t border-gray-300 bg-white">
          <CallControls 
            onLeave={() => navigate("/")}
          />
        </div>
      </div>
    </StreamTheme>
  );
};

export default Call;