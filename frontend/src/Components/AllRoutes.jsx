import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import LoginPage from './Login'
import Bug from './Bug'
import RegisterPage from './Signup'
import ChatApp from '../chat/ChatApp'
import AddBug from './AddBug'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<LoginPage/>}/>
            <Route path='/authregister' element={<RegisterPage/>}/>
            <Route path='/chat' element={<ChatApp/>}/>
            <Route path='/bug' element={<Bug/>}/>
            <Route path='/addbug' element={<AddBug />} />
        </Routes>
    </div>
  )
}

export default AllRoutes