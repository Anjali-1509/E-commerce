import React from 'react'
import { useSearch } from '../context/Search'
import { Link } from "react-router-dom"

const Search = () => {
  const [values, setValues] = useSearch()

  return (
    <div className='container'>
      <div style={{marginBottom:"500px"}} className='text-center'>
        <h1>Search Results</h1>
        <h6>
          {
            values?.results.length < 1 ? "No Products Found" :
              `Found ${values?.results.length}`
          }
        </h6>

        <div className="search-div">

          {
            values?.results.map((item) =>

              <Link>
                <div class="card mb-4" style={{ width: "20rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <img src={`https://e-commerce-9xkj.onrender.com/product/product-photo/${item._id}`}
                    style={{ height: "370px" }}
                    class="card-img-top" alt="..." />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} class="card-body">
                    <h4 class="card-title text-center">{item.name}</h4>
                    <p class="card-text text-center">{item.description.substring(0, 30)}.....</p>
                    <h5 className='text-center'>₹{item.price}</h5>
                    <Link to={`/product/${item.slug}`}> <button className="button">CHECKOUT</button></Link>
                  </div>
                </div>
              </Link>

            )
          }

        </div>

      </div>
    </div>
  )
}

export default Search
