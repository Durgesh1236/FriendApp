import { Link, useLocation } from "react-router-dom";
import { UserData } from "../context/User";
import { LuShipWheel } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";
import { IoColorPaletteSharp } from "react-icons/io5";
import ThemeSelector from "./ThemeSelector";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
    const location = useLocation();
    const ischatPage = location.pathname?.startsWith("/chat")
    const { user, logout } = UserData();
    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-13 glex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mt-2 justify-end w-full">
                    {
                        ischatPage && (
                            <div className="pl-5">
                                <Link to="/" className='flex items-center gap-2.5'>
                                    <LuShipWheel className='size-9 text-primary' />
                                    <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                                        FriendChat
                                    </span>
                                </Link>
                            </div>
                        )
                    }

                    <div className="flex items-center mr-4 gap-3 sm:gap-4">
                        <Link to={"/notification"} >
                        <button className="btn btn-ghost btn-circle">
                            <IoIosNotifications className='size-7 text-base-content opacity-70'/>
                        </button>
                        </Link>
                    </div>

                    <ThemeSelector />

                    <div className="avatar ml-4">
                        <div className="size-8 rounded-full">
                            <img src={user?.profilepic} alt="User Profile" rel="noreferrer" />
                        </div>
                    </div>

                    <button className="btn btn-ghost btn-circle ml-4" onClick={logout}>
                        <IoLogOut className="h-6 w-6 text-base-content opacity-70" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
