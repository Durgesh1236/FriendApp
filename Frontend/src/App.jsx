import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Notification from './pages/Notification'
import Chat from './pages/Chat'
import Call from './pages/Call'
import Onboarding from './pages/Onboarding'
import { UserData } from './context/User'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Friend from './pages/Friend'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { loading, isAuth, isBoarding} = UserData();
  const { theme } = useThemeStore()
  return (
    <>
    <ToastContainer/>
    {loading ? <Loading/>:
    <div className='min-h-screen' data-theme={theme}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <Layout showSidebar={true}> <Home /> </Layout> : <Navigate to="/login"/> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/notification' element={isAuth ? <Layout showSidebar={true}><Notification/></Layout> : <Navigate to="/login"/>} />
          <Route path='/chat/:id' element={isAuth ? <Layout showSidebar={false}><Chat/></Layout> : <Navigate to="/login"/>} />
          <Route path='/call/:id' element={isAuth ? <Call/> : <Navigate to="/login"/>} />
          <Route path='/onboarding' element={isBoarding ? <Onboarding/> : <Navigate to="/login"/>} />
          <Route path='/friends' element={isAuth ? <Friend/> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
}
    </>
  )
}

export default App

