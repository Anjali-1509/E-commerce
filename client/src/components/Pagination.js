import React from 'react'

const Pagination = ({productPerPage, totalProduct, paginate}) => {
const pageNumbers=[]
for(let i=1; i<=Math.ceil(totalProduct/productPerPage); i++){
    pageNumbers.push(i)
}
  return (
    <nav style={{ width:"200px", margin :'auto'}}>
        <ul className='pagination'>
           {
            pageNumbers.map((number)=>
            <li key={number} className='page-item'>
             <a href='!#' onClick={(e)=>{e.preventDefault(); paginate(number)}} className='page-link'>
                {number}
             </a>
            </li>
            )
           }
        </ul>
    </nav>
  )
}

export default Pagination
