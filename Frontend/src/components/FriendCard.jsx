import { UserData } from '../context/User';
import { Link } from "react-router-dom";

const FriendCard = ({ friend }) => {
  const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const { getLanguageFlag } = UserData()
    
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12">
                <img src={friend.profilepic} alt={friend.name} />
            </div>
            <h3 className='font-semibold truncate'>{friend.name}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
            <span className='badge badge-secondary text-xs'>
                {getLanguageFlag(friend.nativeLanguage)}
                Native: {capitialize(friend.nativeLanguage)}
            </span>

            <span className='badge badge-secondary text-xs'>
                {getLanguageFlag(friend.learningLanguage)}
                Learning: {capitialize(friend.learningLanguage)}
            </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
        Message
        </Link>
      </div>
    </div>
  )
}

export default FriendCard
