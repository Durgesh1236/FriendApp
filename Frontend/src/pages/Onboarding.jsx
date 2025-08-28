import React, { useState } from 'react'
import { UserData } from '../context/User'
import { FaCamera } from "react-icons/fa";
import { IoIosShuffle } from "react-icons/io";
import { LANGUAGES } from '../constants/index.js';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Onboarding = () => {
  const { btnLoading, user, onBoarding } = UserData();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    nativeLanguage: user?.nativeLanguage || "",
    learningLanguage: user?.learningLanguage || "",
    location: user?.location || "",
    profilepic: user?.profilepic || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoarding(formState.name, formState.bio, formState.nativeLanguage, formState.learningLanguage, formState.location, formState.profilepic, navigate, formState)
  }

  const handleRendomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({...formState, profilepic: randomAvatar});
    toast.success("Random profile picture generated");
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className="card bg-base-200 w-full max-w-2xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-200 overflow-hidden">
                {formState.profilepic ? (
                  <img src={formState.profilepic} alt='profile preview' className='w-full h-full object-cover' />)
                  : (
                    <div className="flex items-center justify-center h-full">
                      <FaCamera className='size-12 text-base-content opacity-40' />
                    </div>
                  )
                }
              </div>
              <div className="flex items-center gap-2">
                <button type='button' onClick={handleRendomAvatar} className='btn btn-accent'>
                  <IoIosShuffle className='size-4 mr-2' />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className='label-text'>Full Name</span>
              </label>
              <input type="text"
                name='name'
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className='input input-bordered w-full'
                placeholder='Name' />
            </div>

            <div className="form-control">
              <label className="label">
                <span className='label-text'>Bio</span>
              </label>
              <input type="text"
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className='textarea textarea-bordered h-24 w-full'
                placeholder='Tell others about yourself and other language larning goals.' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">Select your native language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className='select select-bordered w-full'
                >
                  <option value="">Select your learning language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))
                  }
                </select>
              </div>

            </div>

            <div className="form-control">
              <label className="label">
                <span className='label-text'>Location</span>
              </label>
              <div className="relative">
                <FaMapMarkerAlt className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
                <input type="text"
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='City, Country' />
              </div>
            </div>

            <button className='btn btn-primary w-full' type='submit'>
              {
                btnLoading ?
                  "Please Wait..."
                  : "Complete Onboarding"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
