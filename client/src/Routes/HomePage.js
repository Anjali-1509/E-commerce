import React from 'react'
import {useAuth} from "../context/Auth"

const HomePage = () => {
  const [auth, setAuth]= useAuth()
  return (
    <div>
      <h1>home page</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
  )
}

export default HomePage
