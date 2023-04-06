import React from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';

const Users = () => {
  return (
    <div className="row m-3 p-3">
    <div className='col-md-3'>
      <AdminMenu />
    </div>
     <div className='col-md-9'>
        <h1>Users</h1>
     </div>
 </div>
  )
}

export default Users
