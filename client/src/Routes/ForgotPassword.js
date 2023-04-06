import React from 'react'
import axios from "axios"
import { useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom"
import { toast } from 'react-toastify';
import {useAuth} from "../context/Auth"



const ForgotPassword = () => {
  const [email, setEmail]= useState("")
  const [answer, setAnswer] = useState('')
  const [newPassword, setNewPassword] = useState("")

  const navigate= useNavigate()
  const location = useLocation()

  const handleSubmit=async(e)=>{
   e.preventDefault()
   try{
   let res =await axios.post("http://localhost:3000/forgot-password", {
    email,answer, newPassword
   })
   console.log(res)
   if(res.data.success){
     toast.success("Successfully logged In")
     navigate("/login")
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

                <h2>RESET <span style={{color:"grey"}}>PASSWORD</span></h2>

                <div class="mb-3">
                    <input type="email"  class="form-control" id="exampleInputPassword1" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>

                <div class="mb-3">
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Facourite Sport" value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
                </div>

                <div class="mb-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
                </div>
                
                <button type="submit" class="btn btn-primary">RESET</button>
            </form>
        </div>
        </div>
  )
}

export default ForgotPassword

