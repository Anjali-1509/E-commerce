import React from 'react'
import UserMenu from './../components/Layout/UserMenu';

const Orders = () => {
  return (
    <div className='container-fluid m-3 p-3'>
       <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>

           <div className='col-md-9'>
             <h1> All Orders</h1>
           </div>
       </div>
    </div>
  )
}

export default Orders
