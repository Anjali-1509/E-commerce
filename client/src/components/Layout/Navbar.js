import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useAuth } from "../../context/Auth"
import SearchInput from '../Form/SearchInput';
import { useCart } from '../../context/Cart';
import {BsCartFill} from "react-icons/bs"
import {GiShoppingBag} from "react-icons/gi"



const Navbar = () => {
  const [auth, setAuth] = useAuth()
  const [cart]= useCart()


  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" })
    localStorage.removeItem("auth")
  }

  return (
    <div className='navbar' style={{ display: "flex", justifyContent: "space-between", padding: "10px"}}>
      <div>
        <ul>
          <Link to="/">
            <li style={{ color: "black" }}> <GiShoppingBag size={30} />SHOPIFY</li>
          </Link>
        </ul>
      </div>

      <div style={{ width: "800px" }}>
        <ul style={{ display: "flex", justifyContent: "space-around" }}>
          <SearchInput />
          <Link to="/"><li>HOME</li></Link>
          
          {
            !auth.user ?
              (<>
                <Link to="/signup"><li>REGISTER</li></Link>
                <Link to="/login"><li>LOGIN</li></Link>
              </>
              )
              :
              (<>
                <li class="nav-item dropdown">
                  <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {(auth?.user?.name).toUpperCase()}
                  </Link>
                  <ul class="dropdown-menu">
                    <Link to={`/dashboard/${auth?.user?.role=== 1 ? "admin" :"user"}`} class="dropdown-item"><li>DASHBOARD</li></Link>
                    <Link to="/login" onClick={handleLogOut} class="dropdown-item"> <li>LOGOUT</li></Link>
                  </ul>
                </li>
              </>)}
          <Link to="/cart"><li><BsCartFill /> CART {cart?.length}</li></Link>
        </ul>
      </div>

    </div>
  )
}

export default Navbar
