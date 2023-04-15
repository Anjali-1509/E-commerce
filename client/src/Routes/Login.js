import React from 'react'
import axios from "axios"
import { useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom"
import toast from "react-hot-toast"
import {useAuth} from "../context/Auth"


const Login = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState('')
  const [auth, setAuth]= useAuth()

  const navigate= useNavigate()
  const location = useLocation()

  const handleSubmit=async(e)=>{
   e.preventDefault()
   try{
   let res =await axios.post("http://localhost:3000/login", {
    email, password
   })
   console.log(res)
   if(res.data.success){
     toast.success("Successfully logged In")
     setAuth({
      ...auth,
      user : res.data.user,
      token : res.data.token
     })
     localStorage.setItem("auth", JSON.stringify(res.data))
     navigate(location.state||"/")
   }else {
    toast.error(res.message)
   }
  }
  catch(err){
    toast.error("Something Went Wrong")
  }
}

  return (
    <div className="form">
        <div id="login">
            <form onSubmit={handleSubmit}>

                <h2 className="heading">LOGIN</h2>

                <div class="mb-3">
                    <input type="email"  class="form-control" id="exampleInputPassword1" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>

                <div class="mb-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>

                  <div>
                    <button type="button" class="btn btn-primary" onClick={()=>navigate("/forgot-password")} >Forgot Password</button>
                  </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
  )
}

export default Login
