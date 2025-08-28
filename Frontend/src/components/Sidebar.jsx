import { LuShipWheel } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { UserData } from '../context/User';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = UserData()
  return (
    <aside className='w-64 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
      <div className="p-5 border-b border-base-300">
        <Link to="/" className='flex items-center gap-2.5'>
          <LuShipWheel className='size-9 text-primary' />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            FriendChat
          </span>
        </Link>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}>
        <IoHome className='size-5 text-base-content opacity-70'/>
        <span>Home</span>
        </Link>

        <Link to="/friends" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""}`}>
        <FaRegUser className='size-5 text-base-content opacity-70'/>
        <span>Friends</span>
        </Link>

        <Link to="/notification" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notification" ? "btn-active" : ""}`}>
        <IoIosNotifications className='size-5 text-base-content opacity-70'/>
        <span>Notification</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={user.profilepic} alt="User Profile" />
            </div>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm">
              {user.name}
            </p>
            <p className='text-xs text-success flex items-center gap-1'>
              <span className='size-2 rounded-full bg-success inline-block'/>
                Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
