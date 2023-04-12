import React from 'react'
import {Routes, Route} from "react-router-dom"
import About from './About'
import Contact from './Contact'
import HomePage from './HomePage'
import Login from './Login'
import Policy from './Policy'
import Signup from './Signup'
import Dashboard from '../user/Dashboard'
import PrivateRoute from './Private'
import ForgotPassword from './ForgotPassword'
import AdminRoute from './AdminRoute'
import AdminDashbaord from './admin/AdminDashbaord'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import Users from './admin/Users'
import Orders from '../user/Orders'
import Profile from '../user/Profile'
import Product from './admin/Product'
import UpdateProduct from './admin/UpdateProduct'
import Products from './Products'
import Search from './Search';
import ProductDetails from './ProductDetails'
import CartPage from './CartPage'

const Rout = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
           <Route path="admin" element={<AdminDashbaord />} />
           <Route path="admin/create-category" element={<CreateCategory />} />
           <Route path="admin/products" element={<Product />} />
           <Route path="admin/create-product" element={<CreateProduct />} />
           <Route path="admin/users" element={<Users />} />
        </Route>
         
        <Route path="/products/:slug" element={<Products />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default Rout
