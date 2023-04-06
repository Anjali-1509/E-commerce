import React from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import { useEffect, useState } from 'react';


const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3)
    const navigate= useNavigate()
    const location = useLocation()
    console.log(location)

   useEffect(()=>{
    const interval = setInterval(()=>{
      setCount(count-1)
    },1000)
     count ===0 && navigate(`/${path}`, {state:location.pathname})
     return ()=>clearInterval(interval)
   },[count,navigate, location])

    return (
        <>
            <div class="d-flex flex-column justify-content-center align-items-center" style={{height:"70vh"}}>
            <h1>Redirecting You In {count} Seconds</h1>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
