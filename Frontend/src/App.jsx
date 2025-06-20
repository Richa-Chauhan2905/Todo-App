import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("jwt")  
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={token?<Home />:<Navigate to={"/login"}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
