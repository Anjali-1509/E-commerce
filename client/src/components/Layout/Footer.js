import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div id="footer" className="bg-dark p-4 text-white">
      <h4 style={{textAlign:"center"}}>All rights reserved & copy</h4>
      <p>
      <Link to="/about">About</Link> |
      <Link to="/contact">Contact</Link> |
      <Link to="/policy">PrivacyPolicy</Link>
      </p>
    </div>
  )
}

export default Footer


