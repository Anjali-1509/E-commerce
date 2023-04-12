import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate} from 'react-router-dom';

const Product = () => {
  const [products, setProduct] = useState([])
  const navigate = useNavigate()

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/product/get-product")
      setProduct(data?.products)
    }
    catch (err) {
      toast.error("Something Went Wrong")
    }
  }

 const handleDelete= async(id)=>{
  try{
    const answer = window.prompt("Are you sure, You want to delete this product")
    if(!answer) return
   const {data}= axios.delete(`http://localhost:3000/product/delete-product/${id}`)
   console.log(data)
   toast.success("Product Deleted Successfully")
   getAllProducts()
   navigate("/dashboard/admin/products") 
  }
  catch{
    toast.error("Something Went Wrong")
  }
 }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='row'>
      <div className='col-md-3'>
        <AdminMenu />
      </div>

      <div className='col-md-9'>
        <h1 className='text-center'>All Products List</h1>
        <div style={{display : "grid", gridTemplateColumns: "repeat(3,1fr)",
         marginBottom:"10px", 
         height:"100vh",
         overflow:"scroll"
         }}>
        {
          products.map((item) =>
  
           <div class="card mb-4" style={{width :"20rem"}}>
              <img src={`http://localhost:3000/product/product-photo/${item._id}`} 
              style={{height:"370px"}}
              class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.description}</p>
                <button onClick={()=>handleDelete(item._id)} className='button'>DELETE</button>
              </div>
            </div>

        
            
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Product
