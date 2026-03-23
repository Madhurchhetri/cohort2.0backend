import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { useAuth } from './features/auth/hook/useAuth'
import Dashboard from './features/chat/pages/Dashboard'
import Protected from './features/auth/components/Protected'

const App = () => {
  const auth = useAuth()
  useEffect(()=>{
    auth.handleGetMe()
  },[])
  return (
    <>
      
      <Routes>
      <Route path='/' element={<Protected><Dashboard/></Protected>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App