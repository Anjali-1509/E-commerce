import React from 'react'
import { useAuth } from '../context/Auth'
import { useCart } from '../context/Cart'

const CartPage = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()

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

  return (
    <div style={{ marginBottom:"100px"}} className='container'>
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
                  <img src={`http://localhost:3000/product/product-photo/${item._id}`}
                    classname="card-img-top"
                    height="240"
                    width="280px"
                    alt="..."
                  />
                </div>

                <div className='col-md-6 p-3'>
                  <h4>{item?.name}</h4>
                  <p>{item?.description.substring(0, 35)}</p>
                  <h4>Price : ₹{item?.price}</h4>
                  <button className="btn btn-outline-dark" onClick={()=>removeCartItem(item._id)}>REMOVE</button>
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
        </div>
      </div>

    </div>
  )
}

export default CartPage
