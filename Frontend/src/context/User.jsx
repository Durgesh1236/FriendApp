import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LANGUAGE_TO_FLAG } from '../constants';

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isAuth, setisAuth] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isBoarding, setIsBoarding] = useState(true);
    const [myfriend, setMyFriend] = useState([]);
    const [acceptRequest, setAcceptRequest] = useState([]);
    const [friendSugestion, setFriendSugestion] = useState([]);
    const [getOutgoingFriendReqs, setgetOutgoingFriendReqs] = useState([]);
    const [myfriendreqs, setMyFriendReqs] = useState([]);
    const [tokenData, setTokenData] = useState(null);
    const [userChat, setUserChat] = useState(null);

    async function SignUp( name, mobileno, email, password, navigate) {
        setbtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", {name, mobileno, email, password});
            if(data.success){
                toast.success(data.message);
                setUser(data.user);
                setbtnLoading(false);
                setisAuth(true);
                setIsBoarding(true);
                navigate("/onboarding");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            setbtnLoading(false); 
        }
    }

    async function login(email, password, navigate, setSignIn, signIn) {
        setbtnLoading(true)
        setLoading(true)
        try {
            const { data } = await axios.post("/api/user/login", {email, password});
            if(data.success){
                setUser(data.user);
                setIsBoarding(true)
                setSignIn({...signIn , email: ""})
                setSignIn({...signIn , password: ""})
                setLoading(false)
                if(data.user.isOnBoarded){
                toast.success(data.message);
                setisAuth(true);
                navigate("/");
                } else {
                    navigate("/onboarding");
                    setLoading(false)
                }
            } else {
                toast.error(data.message);
                setbtnLoading(false)
            }
        } catch (error) {
            console.error(data.message);
            toast.error(toast.message);
            setbtnLoading(false);
        }
    }

    async function logout() {
        try {
            const { data } = await axios.post("/api/user/logout");
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function onBoarding(name, bio, nativeLanguage, learningLanguage, location, profilepic, navigate) {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/user/onboarding", {name, bio, nativeLanguage, learningLanguage, location, profilepic});
            if(data.success){
                toast.success(data.message)
                setisAuth(true)
                navigate("/");
                setLoading(false);
            } else {
            toast.warning(data.message)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    async function fetchUser() {
        setLoading(true)
        try {
            const {data} = await axios.post("/api/user/my-profile");
            setUser(data)
            setisAuth(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    //my-friend
    async function userfriend() {
        try {
            const { data } = await axios.get("/api/auth/friends");
            setMyFriend(data);
        } catch (error) {
            console.log(error);
        }
    }

    //send friend request
    async function sendFriendRequest(id) {
        setLoading(true);
        try {
            const {data} = await axios.post("/api/auth/friend-request/" + id);
            if(data.success){
                toast.success(data.message);
                setLoading(false);
            } else{
                toast.warning(data.message);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    //recomended friend request
    async function recomendedFriend() {
        try {
            const {data} = await axios.get("/api/auth/recommended-friends");
            if(data.success){
                setFriendSugestion(data.recommendedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //check user request exist
    async function OutgoingFriendReqs() {
        try {
            const { data } = await axios.get("/api/auth/outgoing-friend-requests");
            setgetOutgoingFriendReqs(data.outgoingRequest);
        } catch (error) {
            console.log(error);
        }
    }

    //friend request
    async function getFriendRequest() {
        setLoading(true)
        try {
            const { data } = await axios.get("/api/auth/friend-request");
            setMyFriendReqs(data.incomingRequest);
            setAcceptRequest(data.acceptRequest);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    //friend request accepted
    async function acceptFriendRequest( id ) {
        try {
            const { data } = await axios.put("/api/auth/friend-request/" + id + "/accept");
            if(data.success){
                toast.success(data.message);
            } else {
                toast.warning(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // async function Chat() {
    //     try {
    //         const { data } = await axios.get("/api/chat/token");
    //         setUserChat(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function getChatToken() {
    try {
        const { data } = await axios.get("/api/chat/token");
        setTokenData(data);
    } catch (error) {
        console.log("Failed to get Stream token", error);
    }
}

    //fleg image
    function getLanguageFlag(language) {
            if(!language){
                return null;
            }
            const langLower = language.toLowerCase();
            const countryCode = LANGUAGE_TO_FLAG[langLower];
            if(countryCode){
                return (
                    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${langLower} flag`} className='h-3 mr-1 inline-block' />
                )
            }
            return null;
        }

    useEffect(() => {
        fetchUser();
        userfriend();
        recomendedFriend();
        OutgoingFriendReqs();
        getFriendRequest();
    }, []);

    return <UserContext.Provider value={{
        login,
        SignUp,
        user,
        isAuth,
        btnLoading,
        loading,
        isBoarding,
        onBoarding,
        logout,
        myfriend,
        sendFriendRequest,
        friendSugestion,
        getLanguageFlag,
        getOutgoingFriendReqs,
        myfriendreqs,
        acceptFriendRequest,
        recomendedFriend,
        userfriend,
        acceptRequest,
        getChatToken,
        tokenData,
         userChat,
        setUserChat,
    }}>{children}</UserContext.Provider>
}

export const UserData = () => useContext(UserContext)