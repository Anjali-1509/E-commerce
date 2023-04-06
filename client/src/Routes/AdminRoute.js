import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/Auth'
import { Outlet } from 'react-router-dom'
import  axios  from 'axios';
import Spinner from '../components/Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] =useAuth()

    useEffect(()=>{
     const authCheck=async()=>{
        let res = await axios.get("http://localhost:3000/admin-auth",{
            headers:{
                "x-auth-token": auth?.token
            }
        })
        if(res.data.ok){
            setOk(true)
        }else{
            setOk(false)
        }
     }
     if(auth?.token) authCheck()
    },[auth?.token])

  return ok ? <Outlet /> : <Spinner path="/" />
}

export default AdminRoute
