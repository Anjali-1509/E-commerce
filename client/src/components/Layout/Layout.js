import React from 'react'
import Rout from '../../Routes/Rout'
import Footer from './Footer'
import Navbar from './Navbar'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';


const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <Rout />
      <main style={{minHeight:"70vh"}}>
      {children}
      <ToastContainer />
      <Toaster />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
