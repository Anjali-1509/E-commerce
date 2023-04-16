import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from "axios"
import { useCart } from '../context/Cart';
import toast from "react-hot-toast"


const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState([])
  const [relatedProduct, setRelatedProduct] = useState([])
  const [cart, setCart] = useCart()

  const getProduct = async () => {
    try {
      let { data } = await axios.get(`http://localhost:3000/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product?._id, data?.product.category._id)
    }
    catch (err) {
      console.log(err)
    }
  }

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/product/related-product/${pid}/${cid}`)
      setRelatedProduct(data?.products)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  return (
    <div>
      <div className='row container mt-3'>
        <div className='col-md-6' id='product-img-div'>
          <img
            src={`http://localhost:3000/product/product-photo/${product._id}`}
            className="card-img-top"
            height="600"
            width="550px"
            id='product-img'
            alt="..."
          />
        </div>
        <div className='col-md-6 text-center'>
          <h1 className='heading'>Product Details</h1>
          <h2>{product?.name}</h2>
          <p>Description: {product.description}</p>
          <h5>Category : {product?.category?.slug}</h5>
          <h4>Price : ₹{product.price}</h4>
          <Link to="/cart">
            <button
              className="button"
              onClick={() => {
                setCart([...cart, product])
                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                toast.success("Product Added To Cart Successfully")
              }}
            >ADD TO CART</button>
          </Link>
        </div>
      </div>

      <div className='row'>
        <h1 className="heading" >Similar Products</h1>

        <div className='card-div'>
          {
            relatedProduct.map((item) =>


              <div class="card mb-4" style={{ width: "20rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <img
                  src={`http://localhost:3000/product/product-photo/${item._id}`}
                  style={{ height: "370px" }}
                  class="card-img-top"
                  id='product-img'
                  alt="..."
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} class="card-body">
                  <h4 class="card-title text-center">{item.name}</h4>
                  <p class="card-text text-center">{item.description.substring(0, 30)}.....</p>
                  <h5 className='text-center'>₹{item.price}</h5>
                  <Link to={`/product/${item.slug}`}> <button className="button">CHECKOUT</button></Link>
                </div>
              </div>


            )
          }

        </div>
      </div>
    </div>
  )
}

export default ProductDetails
