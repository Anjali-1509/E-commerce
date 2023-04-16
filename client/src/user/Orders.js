import React, { useEffect, useState } from 'react'
import UserMenu from './../components/Layout/UserMenu';
import axios from "axios";
import { useAuth } from '../context/Auth';
import moment from "moment"




const Orders = () => {
   const[orders, setOrders] = useState([])
   const [auth, setAuth] = useAuth()

   const getOrders = async()=>{
  const {token}= JSON.parse(localStorage.getItem("auth"))
   try{
       const {data} = await axios.get("http://localhost:3000/orders", {
        headers : {
          "x-auth-token" : token
        }
       })
       setOrders(data)

       console.log(data)
   }
   catch(err){
    console.log(err)
   }
   }

   useEffect(()=>{
   if(auth?.token) getOrders()
   },[auth?.token])

  return (
    <div className='container-fluid m-3 p-3'>
       <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>

           <div style={{ marginBottom:"100px"}} className='col-md-9'>
             <h1 className='heading'> All Orders</h1>
              <div className="order-table-div">
             {
              orders.map((item, index)=>
               <div className='border-shadow'>
                 <table className='table'>
                  <thead>
                     <tr>
                        <td scope='column'>#</td>
                        <td scope='column'>STATUS</td>
                        <td scope='column'>BUYER</td>
                        <td scope='column'>DATE</td>
                        <td scope='column'>PAYMENT</td>
                        <td scope="column">QUANTITY</td>
                     </tr>
                  </thead>
                   <tbody>
                     <tr>
                       <th>{index+1}</th>
                       <th>{item?.status}</th>
                       <th>{item?.buyer?.name}</th>
                       <th>{moment(item?.createAt).fromNow()}</th>
                       <th>{item?.payment.success ? "Success" : "Failed"}</th>
                       <th>{item?.products?.length}</th>
                     </tr>
                   </tbody>
                 </table>
                 <div className="container">
                 {
                 item?.products?.map((item) =>
              <div className="row mb-2 card flex-row">

                <div className='col-md-4'>
                  <img src={`http://localhost:3000/product/product-photo/${item._id}`}
                    classname="card-img-top"
                    height="240"
                    width="280px"
                    alt="..."
                    style={{marginLeft:"-12px"}}
                  />
                </div>

                <div className='col-md-6 p-3'>
                   <h4>{item?.name}</h4>
                   <p>{item.description.substring(0,35)}</p>
                   <h4>Price : ₹{item?.price}</h4> 
                </div>
              </div>
            )
          }
                 </div>
               </div>
              )
             }
             </div>
           </div>
       </div>
    </div>
  )
}

export default Orders
