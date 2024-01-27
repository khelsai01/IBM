
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { getLogin } from '../Redux/action';
const LoginPage = () => {
  const dispatch = useDispatch()
  const {isAuth,isLoading} = useSelector((store)=>{
   return{
    isAuth:store.isAuth,
    isLoading:store.isLoading
   }
  })

  console.log(isAuth)

  const nav=useNavigate()
  const [input,setInput]=useState({
    email:"",
    password:""
  });
  const LoginWithGoogle=()=>{
   window.open("http://localhost:8080/auth/google/callback","_self")
    }
  const handleInputChange=(e)=>{
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
const [errorMessage,setErrorMessage]=useState("")
  
  async function handleLogin(e){
e.preventDefault()
    
        const { email, password } = input;
        const userData = { email, password };
try {
// await axios.post("http://localhost:8080/api/login",userData)
 await dispatch(getLogin(userData))
  alert("Logged in Successfull Welcome to Bug Tracker")

} catch (error) {
  const errorMessage = error.response ? error.response.data.message : "Something went wrong.";
    setErrorMessage(errorMessage);
    alert("Something went wrong. Please check your credentials.");
    console.log(error,"err")
}
  }

  if(isAuth){
    return nav("/chat")
  }
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome To Bug Tracker</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="username"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
          <div className='py-2 text-center mb-2'>
                Don't have account yet ? <Link className='underline text-black' to="/authregister">Register Here</Link>
            </div>
        </form>
        <p className='m-auto text-center'>Or</p>
        <button className='flex bg-white border border-spacing-1 p-1 rounded-md px-6 items-center justify-between m-auto' onClick={LoginWithGoogle}>
          
          <img className='w-12' src="https://img.icons8.com/?size=48&id=17949&format=png" alt="google" />
          Sign In with Google

        </button>
      </div>
    </div>
  )
}

export default LoginPage




