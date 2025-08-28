import React from 'react'
import { UserData } from '../context/User'
import { FaBell, FaClock, FaUserCheck } from 'react-icons/fa'
import { FaRegMessage } from 'react-icons/fa6';
import NoFriendFound from '../components/NoFriendFound';

const Notification = () => {
  const {loading, myfriendreqs, acceptFriendRequest, acceptRequest} = UserData();
 
  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notification</h1>
        {
          loading ? (
            <div className="flex justify-center py-12">
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          ) : (<>
          {
            myfriendreqs.length > 0 && (
              <section className='space-y-4'>
                <h2 className='text-xl font-semibold flex items-center gap-2'>
                  <FaUserCheck className='h-5 w-5 text-primary'/>
                  Friend Requests
                  <span className='badge badge-primary ml-2'>{myfriendreqs.length}</span>
                </h2>

                <div className="space-y-3">
                  {
                    myfriendreqs.map((incomingRequest) => (
                      <div key={incomingRequest._id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img src={incomingRequest.sender.profilepic} alt={incomingRequest.sender.name} />
                            </div>
                            <div className="">
                              <h3 className='font-semibold'>{incomingRequest.sender.name}</h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className='badge badge-secondary badge-sm'>
                                  Native: {incomingRequest.sender.nativeLanguage}
                                </span>
                                <span className='badge badge-outline badge-sm'>
                                  Learning: {incomingRequest.sender.nativeLanguage}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className='btn btn-primary btn-sm'
                          onClick={()=> acceptFriendRequest(incomingRequest._id)}>Accept</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            )}

            {acceptRequest.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaBell className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptRequest.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilepic}
                              alt={notification.recipient.name}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.recipient.name}</h3>
                            <p className="text-sm my-1">
                              {notification.recipient.name} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <FaClock className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <FaRegMessage className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {myfriendreqs.length === 0 && acceptRequest.length === 0 && (
              <NoFriendFound />
            )}
          </>)
        }
      </div>
      
    </div>
  )
}

export default Notification
 