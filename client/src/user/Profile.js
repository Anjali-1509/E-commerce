import React, { useEffect } from 'react'
import UserMenu from '../components/Layout/UserMenu'
import { useState } from "react"
import { toast } from 'react-hot-toast';
import axios from "axios"
import { useAuth } from '../context/Auth';


const Profile = () => {
  const [auth, setAuth] = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {token} = JSON.parse(localStorage.getItem("auth"))
    try {
      let {data} = await axios.put("https://e-commerce-9xkj.onrender.com/update-user", {
        name, email, password, phone, address}, {
          headers:{
            "x-auth-token" :token
          }
        })
      if(data?.error){
        toast.error("Something Went Wrong")
      }
      else {
        setAuth({...auth, user : data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data?.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
     const {email, name,phone, address}= auth?.user
     setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)

  }, [auth?.user])


  return (
    <div id="profile-div" className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>

        <div style={{display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"column"}} className='col-md-9 text-center'>
          <h1>Your Profile</h1>
          <div className='text-center'>

            <div className='text-center' id="signup">
              <form onSubmit={handleSubmit}>

                <h2>USER PROFILE</h2>

                <div class="mb-3">
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Name" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div class="mb-3">
                  <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                </div>

                <div class="mb-3">
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="mb-3">
                  <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div class="mb-3">
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)}  />
                </div>

                <button type="submit" class="btn btn-primary">UPDATE</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
