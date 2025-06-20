import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigateTo = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:4001/user/login", {
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(data)
            localStorage.setItem("jwt", data.user.token);
            toast.success("Login successful")
            navigateTo("/")
            setEmail("")
            setPassword("")

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errors || "Cannot Login");
        }
    }
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className='text-2xl font-semibold text-center'>Login</h2>
                <form onSubmit={handleRegister}>
                    <div className='mb-4 '>
                        <label className='block mb-2 font-semibold'>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4 '>
                        <label className='block mb-2 font-semibold'>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-200 rounded-xl font-semibold p-3'>Login</button>
                    <p className='mt-4 text-center text-gray-600'> New User ?
                        <Link to="/signup" className='text-blue-600 hover:underline'> SignUp</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login