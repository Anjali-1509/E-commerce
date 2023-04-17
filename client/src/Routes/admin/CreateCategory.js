import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useState, useEffect } from 'react'
import axios from "axios"
import CategoryForm from './../../components/Form/CategoryForm';
import toast, { Toaster } from 'react-hot-toast';
import {Modal} from "antd"




const CreateCategory = () => {
  const [category, setCategory]= useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName]= useState("")

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const {token} = JSON.parse(localStorage.getItem("auth"))
    console.log(token)
    const {data} = await axios.post("https://e-commerce-9xkj.onrender.com/category/create-category", {name},{
      headers:{
        "x-auth-token" :token
      }
    })
    console.log(data)
    if(data?.category){
      toast.success(`${name} is created`)
      getCategory()
    }
     else {
      toast.error(data.message)
     }
  }

  const getCategory= async()=>{
    try{
     let {data} =await axios.get("https://e-commerce-9xkj.onrender.com/category/get-category")
     if(data.success){
      setCategory(data.category)
     }
    }
    catch(err){
      console.log(err)
    }
  }
 
  useEffect(()=>{
    getCategory()
  }, [])

  const handleUpdate=async(e)=>{
   e.preventDefault()
   const {token} = JSON.parse(localStorage.getItem("auth"))
   try{
    const {data}= await axios.put(`https://e-commerce-9xkj.onrender.com/category/update-category/${selected._id}`, {
    name:updatedName
  },{
    headers:{
      "x-auth-token":token
    }
  })
  console.log(data)
  if(data.success){
    toast.success(`${updatedName} is Successfully Updated`)
    setSelected(null)
    setUpdatedName("")
    setVisible(false)
    getCategory()
  }
   }
   catch(err){
    toast.error("Something Went Wrong")
   }
  }

  const handleDelete=async(id)=>{
    const {token} = JSON.parse(localStorage.getItem("auth"))
    try{
     const {data}= await axios.delete(`https://e-commerce-9xkj.onrender.com/category/delete-category/${id}`,{
     headers:{
       "x-auth-token":token
     }
   })
   console.log(data)
   if(data.success){
     toast.success("Categoryis Successfully Deleted")
     setSelected(null)
     getCategory()
   }
    }
    catch(err){
     toast.error("Something Went Wrong")
    }
   }

  return (
    <div className="row m-3 p-3">
       <div className='col-md-3'>
         <AdminMenu />
       </div>
        <div className='col-md-9'>
           <h1>Manage Category</h1>
           <div className="p-3">
            <CategoryForm 
            value={name}
            setValue={setName}
            handleSubmit={handleSubmit}
            />
           </div>

           <div className="w-75">
           <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
     {
      category.map((item)=>
       <>
       <tr>
       <td key={item._id}>{item.slug}</td>
       <td><button className='button' onClick={()=>{setVisible(true); setUpdatedName(item.name); setSelected(item)}}>EDIT</button></td>
       <td><button className='button' onClick={()=>handleDelete(item._id)}>DELETE</button></td>
       </tr>
       </>
      )
     }
  </tbody>
</table>
           </div>
           <Modal
           onCancel={()=>setVisible(false)}
           footer={null}
           visible={visible}
           >
           <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
           </Modal>
        </div>
    </div>
  )
}

export default CreateCategory
