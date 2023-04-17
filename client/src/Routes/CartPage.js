import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/Auth'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import axios from "axios"
import toast from "react-hot-toast"

const CartPage = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const [clientToken, setClientToken] = useState("")
  const [instance, setInstance] = useState("");
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate()

  const totalPrice = ()=>{
   let total = 0
   cart.map((item)=>
     total = total + item.price
   )
   return total
  }

  const removeCartItem= (pid)=>{
  try{
   let myCart = [...cart]
   let index = myCart.findIndex((item)=>item._id === pid)
   myCart.splice(index,1)
   setCart(myCart)
   localStorage.setItem("cart", JSON.stringify(myCart))
  }
  catch(err){

  }
  }

  const getToken = async()=>{
  try{
   const {data} = await axios.get("https://e-commerce-9xkj.onrender.com/product/braintree/token")
   setClientToken(data?.clientToken)
  }
  catch(err){
    console.log(err)
  }
  }

  useEffect(()=>{
     getToken()
  }, [auth?.token])


  //HANDLE PAYMENT

  const handlePayment = async () => {
    const {token} = JSON.parse(localStorage.getItem("auth"))
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("https://e-commerce-9xkj.onrender.com/product/braintree/payment", {
        nonce,
        cart,
      }, {
        headers : {
          "x-auth-token" : token
        }
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <div style={{ marginBottom:"200px"}} className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h1 className='heading'>
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className='heading'>
            {
              cart?.length >= 1 ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "Please Login To Checkout"
                }` : "Your Cart Is Empty"
            }
          </h4>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8'>
          {
            cart?.map((item) =>
              <div className="row mb-2 card flex-row">

                <div className='col-md-4'>
                  <img src={`https://e-commerce-9xkj.onrender.com/product/product-photo/${item._id}`}
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
                  <button className="button" onClick={()=>removeCartItem(item._id)}>REMOVE</button> 
                </div>
              </div>
            )
          }
        </div>
        <div className='col-md-4 text-center'>
          <h2 className='heading'>Cart Summary</h2>
          <p>Total | checkout | payment</p>
          <hr />
          <h4>Total : ₹{totalPrice()}</h4>
          {
            auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4 className="heading">Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button 
                  className="button"
                  onClick={()=>navigate("/dashboard/user/profile")}
                  >
                    UPDATE ADDRESS
                  </button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                {
                  auth?.token ? (
                  <button className='btn btn-dark' onClick={()=>navigate("/dashboard/user/profile")}>UPDATE ADDRESS</button>
                  ) :(
                    <button className='btn btn-dark' onClick={()=>navigate("/login")}>PLEASE LOGIN TO CHECKOUT</button>
                  )
                }
                </div>
    
            )}
            <div >
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
        </div>
      </div>

    </div>
  )
}

export default CartPage
