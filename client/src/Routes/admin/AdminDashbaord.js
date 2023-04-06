import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';
import Layout from './../../components/Layout/Layout';

const AdminDashbaord = () => {
 const [auth]= useAuth()

  return (
    <div className='center-fluid m-3 p-3'>
       <div className="row">
         <div className='col-md-3'>
           <AdminMenu />
         </div>
          <div className='col-md-9'>
            <div className='card w-75 p3'>
               <h2>Admin Name : {auth?.user?.name}</h2>
            </div>
          
          </div>
       </div>
    </div>
  )
}

export default AdminDashbaord
