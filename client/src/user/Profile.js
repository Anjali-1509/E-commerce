import React from 'react'
import UserMenu from '../components/Layout/UserMenu'
import { useState } from "react"
import { toast } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post("http://localhost:3000/register", {
        name, email, password, phone, address
      })
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
      else {
        toast.error(res.data.message)
      }

    }
    catch (err) {
      console.log(err)
      toast.error("Something Went Wrong")
    }
  }

  return (
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>

        <div className='col-md-9 text-center'>
          <h1>Your Profile</h1>
          <div className='text-center'>

            <div className='text-center' id="signup">
              <form onSubmit={handleSubmit}>

                <h2>USER PROFILE</h2>

                <div class="mb-3">
                  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Name" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div class="mb-3">
                  <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div class="mb-3">
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div class="mb-3">
                  <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div class="mb-3">
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div class="mb-3">
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Which is your favourite sport" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
