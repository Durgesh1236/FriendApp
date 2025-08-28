import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserData } from "../context/User";
import FriendCard from "../components/FriendCard";
import NoFriendFound from "../components/NoFriendFound";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";

const Home = () => {
  const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const { loading, myfriend, friendSugestion , getOutgoingFriendReqs, getLanguageFlag, sendFriendRequest, recomendedFriend, userfriend} = UserData();
  useEffect(() => {
    recomendedFriend();
    userfriend();
  }, [])
  
  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
          <Link to='/notification' className="btn btn-outline btn-sm hover:bg-white hover:text-black">
          <FaUserPlus className='mr-2 size-4'/>
          Friend Request
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"/>
            </div>
        ) : (
          myfriend.length === 0 ? (
            <NoFriendFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {
                myfriend.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))
              }
            </div>
          ))}

          <section>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Meet New Learners
                  </h2>
                  <p>Discover perfect language exchange partners based on your profile</p>
                </div>
              </div>
            </div>

            {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"/>
            </div>
        ) : (
          friendSugestion.length === 0 ? (
            <div className='card bg-base-200 p-6 text-center'>
      <h3 className='font-semibold text-lg mb-2'>No recommendation available</h3>
      <p className='text-base-content opacity-70'>
        Check back later for new language partners!
      </p>
    </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {
                friendSugestion.map((friends) => {
                  // const hasRequestBeenSent = getOutgoingFriendReqs.includes(friends._id)
                  // console.log(hasRequestBeenSent)

                 return (
                 <div key={friends._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                  <div className="card-body p-5 space-y-4">
                    <div className="avatar size-16 rounded-full">
                      <img src={friends.profilepic} alt={friends.name} />
                    </div>

                    <div className="">
                      <h3 className="font-semibold text-lg"> {friends.name} </h3>
                      {
                        friends.location && (
                          <div className="flex items-center text-xs opacity-70 mt-1">
                            <FaMapMarkerAlt className="size-3 mr-1" />
                            {friends.location}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-secondary">
                      {getLanguageFlag(friends.nativeLanguage)}
                      Native: {capitialize(friends.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline">
                      {getLanguageFlag(friends.learningLanguage)}
                      Native: {capitialize(friends.learningLanguage)}
                    </span>
                  </div>
                  {friends.bio && <p className="text-sm opacity-70">{friends.bio}</p>}

                  {/* <button className={`btn w-full mt-2 ${
                    getOutgoingFriendReqs.status === "pending" ? "btn-disable" : "btn-primary"
                  }`}
                  onClick={() => sendFriendRequest(friends._id)}
                  >
                    {
                      getOutgoingFriendReqs.status == "pending" ? (
                        <>
                        <FaCheckCircle className="size-4 mr-2" />
                        Request Sent 
                        </>
                      ) : (
                        <>
                        <FaUserPlus className="size-4 mr-2"/>
                        Send Friend Request 
                        </>
                      )
                    }
                  </button> */}

                  <button className={`btn w-full mt-2 ${
                    getOutgoingFriendReqs.status === "pending" ? "btn-disable" : "btn-primary"
                  }`}
                  onClick={() => sendFriendRequest(friends._id)}
                  >
                    {
                      getOutgoingFriendReqs.status === "pending" ? (
                        <>
                        <FaCheckCircle className="size-4 mr-2" />
                        Request Sent 
                        </>
                      ) : (
                        <>
                        <FaUserPlus className="size-4 mr-2"/>
                        Send Friend Request 
                        </>
                      )
                    }
                  </button>
                 </div>
                )})} 
            </div> 
          ))}
          </section>
      </div>
    </div>
  )
}

export default Home