import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState} from 'react'
import { Animate } from 'react-simple-animate'
import { Radio} from "antd"
import { Prices } from '../components/Layout/Prices'
import Pagination from '../components/Pagination'

const Products = () => {
  const param = useParams()
  const navigate= useNavigate()
  const [product, setProduct] = useState([])
  const [radio, setRadio] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage, setProductPerPage] = useState(6)
  

  const indexOfLastProduct = currentPage*productPerPage
  const indexOfFirstProduct =indexOfLastProduct-productPerPage
  const curretProducts= product.slice(indexOfFirstProduct, indexOfLastProduct)


  const paginate= (pageNumber)=>setCurrentPage(pageNumber)

  const getProduct=async()=>{
   try{
  const {data} = await axios.get(`http://localhost:3000/product/get-product-by-category/${param.slug}`)
   setProduct(data)
   console.log("cp", curretProducts)
   } 
   catch(err){
    console.log(err)
   }
  }

   const filterProduct = async()=>{
    try{
      let {data}=await axios.post(`http://localhost:3000/product/product-filters/${param.slug}`, {radio})
      console.log(data)
      setProduct(data?.products)
    }
    catch(err){
      console.log(err)
    }
   }

  useEffect(()=>{
   if(!radio.length) getProduct()
  },[radio.length])

  useEffect(()=>{
   if(radio.length) filterProduct()
  },[radio])

  return (
   <>
   <div style={{marginBottom:"600px"}}>
    <div className='product-card-div'>
      <div className="sidebar">
        <h3>FILTER BY PRICE</h3>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
             {
              Prices.map((item)=>
              <div key={item.id}>
              <h2>
              <Radio className="radio" value={item.array}>
                {item.name}
              </Radio>
              </h2>
              </div>
              )
             }
          </Radio.Group>
          <div>
            <button className="button" onClick={()=>window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
      </div>

      <div className='card-div'>
     
      {
        curretProducts.map((item)=>
                    
         
         <div class="card mb-4" style={{width :"20rem", display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
              <img src={`http://localhost:3000/product/product-photo/${item._id}`}
              style={{height:"370px"}}
              class="card-img-top" alt="..." />
              <div style={{display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}} class="card-body">
                <h4 class="card-title text-center">{item.name}</h4>
                <p class="card-text text-center">{item.description.substring(0,30)}.....</p>
                 <h5 className='text-center'>₹{item.price}</h5>
                 <Link to={`/product/${item.slug}`}> <button className="button">CHECKOUT</button></Link>
              </div>
            </div>
         
     
        )
      }

      </div>

    </div>

 </div>
    <div style={{width:"85%", marginLeft:"300px", disaply:"flex", alignItems:"center", justifyContent:"center"}}>
        <Pagination productPerPage={productPerPage} totalProduct={product.length} paginate={paginate}/>
      </div>
    </>
  )
}

export default Products
