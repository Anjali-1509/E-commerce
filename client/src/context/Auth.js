import { useState, useEffect,useContext, createContext } from "react";


const AuthContext = createContext()

const AuthProvider=({children})=>{
    const [auth, setAuth] = useState({user:null, token:""})
  

    useEffect(()=>{
     let data = localStorage.getItem("auth")
     if(data){
     let parsedData = JSON.parse(data)
     setAuth({
      ...auth,
      user: parsedData.user,
      token:parsedData.token
     })
    }
    },[])

    return (
      <AuthContext.Provider value={[auth, setAuth]}>
         {children}
      </AuthContext.Provider>
    )
}

//custom hook
const useAuth= ()=>useContext(AuthContext)

export {useAuth, AuthProvider}