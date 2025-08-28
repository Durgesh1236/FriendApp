import { useState } from 'react'
import { LuShipWheel } from "react-icons/lu";
import { UserData } from '../context/User';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {
    const { login, btnLoading } = UserData();
    const navigate = useNavigate()
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handlesignup = (e) => {
    e.preventDefault()
    login(signIn.email, signIn.password, navigate, setSignIn)
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <LuShipWheel className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              FriendChat
            </span>
          </div>

          <form onSubmit={handlesignup}>
            <div className="space-y-4">
              <div className="">
                <h2 className='text-xl font-semibold'>Create an Account</h2>
                <p className='text-sm opacity-50'>Join FriendChat and start your language learning adventure!</p>
              </div>

              <div className="space-y-3">

                <div className='form-control w-full '>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type="text"
                    placeholder='radhekrishn@gmail.com'
                    className='input input-bordered w-full'
                    value={signIn.email}
                    onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
                    required
                  />
                </div>

                <div className='form-control w-full '>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input type="text"
                    placeholder='Radhe@123 Example'
                    className='input input-bordered w-full'
                    value={signIn.password}
                    onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
                    required
                  />
                  <p className='text-xs opacity-70 mt-1'>Password must be at least 6 character long</p>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-center gap-2">
                    <input type="checkbox" className='checkbox xheckbox-sm' required />
                    <span className='text-xs leading-tight'>
                      I agree to the {" "}
                      <span className='text-primary hover:underline'>terms of service</span>
                       <span className='text-primary hover:underline'>privacy policy.</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <button className='btn btn-primary w-full' type='submit'>
                {
                    btnLoading ? 
                    "Please Wait..."
                    : "Login"
                }
                </button>

              <div className="text-center mt-4">
                <p>Already have an account?{""}</p>
                <Link to="/sign-up" className='text-primary hover:underline'>SignUp</Link>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
        <div className="max-w-md p-8">
          <div className="relative aspect-square max-w-sm mx-auto">
         <img src={assets.Video_call} alt="Language connection illustration" className='w-full h-full' />
          </div>

          <div className="text-center space-y-3 mt-6">
            <h2 className='text-xl font-semibold'>Connect with language partners worldwide.</h2>
            <p className='opacity-70'>Practice conversations, make friends, and improve your language skills together</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login
