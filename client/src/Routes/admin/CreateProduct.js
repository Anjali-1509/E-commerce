import React from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import { useState,useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {Select} from "antd"
const {Option} = Select

const CreateProduct = () => {
   const [categories, setCategories]= useState([])
   const [category, setCategory] = useState([])
   const [name, setName]= useState("")
   const [description, setDescription] = useState("")
   const [price, setPrice] = useState("")
   const [quantity, setQuantity] = useState("")
   const [shipping, setShipping] = useState("")
   const [photo, setPhoto]= useState("")
   const navigate= useNavigate()
   //GET CATEGORY
   const getCategory= async()=>{
    try{
     let {data} =await axios.get("http://localhost:3000/category/get-category")
     if(data.success){
      setCategories(data.category)
     }
    }
    catch(err){
    toast.error("Something Went Wrong")
    }
  }
 
  useEffect(()=>{
    getCategory()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();
    const {token} = JSON.parse(localStorage.getItem("auth"))
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "http://localhost:3000/product/create-product",
        productData,{
          headers:{
            "x-auth-token" : token
          }
        }
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="row m-3 p-3">
    <div className='col-md-3'>
      <AdminMenu />
    </div>
     <div className='col-md-9'>
        <h1>Create Poduct</h1>
        <div className='m-1  w-75'>
      
          <Select 
          placeholder={'Select a Category'}
          size="large"
          style={{ width: 800 }}
          showSearch
          className='form-search  mb-3'
          onChange={(value)=>setCategory(value)}
          >
           {
            categories.map((item)=>
            <Option key={item._id} value={item._id}>{item.name}</Option>
            )
           }
          </Select>
          <div className='mb-3'>
            <label 
            className='btn btn-outline-secondary col-md-12'
            >
            {photo ? photo?.name : "Upload Photo"}
            <input 
            type="file" 
            name="photo"
            accept='image/*'
            onChange={(e)=>setPhoto(e.target.files[0])}
            hidden
            />
            </label>
          </div>
          <div className='mb-3'>
              {photo && (
                <div className='text-center'>
                   <img
                       src={URL.createObjectURL(photo)}
                       alt="Product"
                       height={"200px"}
                       className='img img-responsive'
                    />
                </div>
              )}
          </div>

           <div className='mb-3'>
             <input
             type="text"
             placeholder='Write Name Here'
             className='form-control'
             value={name}
             onChange={(e)=>setName(e.target.value)}
              />
           </div>

           <div className='mb-3' >
             <textArea
             style={{height:"100px"}}
             type="text"
             placeholder='Write Description Here'
             className='form-control input-lg'
             value={description}
             onChange={(e)=>setDescription(e.target.value)}
              />
           </div>

           <div className='mb-3'>
             <input
             type="number"
             placeholder='Enter Price Here'
             className='form-control'
             value={price}
             onChange={(e)=>setPrice(e.target.value)}
              />
           </div>

           <div className='mb-3'>
             <input
             type="number"
             placeholder='Enter quantity Here'
             className='form-control'
             value={quantity}
             onChange={(e)=>setQuantity(e.target.value)}
              />
           </div>

           <div className='mb-3'>
             <Select
              placeholder="Select Shipping"
              size="large"
              showSearch
              className='form-select mb-3'
              onChange={(value)=>setShipping(value)}
             >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
             </Select>
           </div>
          
          <div className="mb-3">
            <button onClick={handleCreate} className="button">CREATE PRODUCT</button>
          </div>

         
        </div>
     </div>
 </div>
  )
}

export default CreateProduct
