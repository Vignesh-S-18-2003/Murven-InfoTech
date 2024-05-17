import React from 'react'
import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <div className='top'> 
        <h1>Payment</h1>
        <div>
          <Link to="products" className='nav' >Products</Link>
          <Link to="address" className='nav'>Address</Link>
          <Link to="delivery" className='nav'>Delivery</Link>
          <Link to="pay" className='nav'>Payment</Link>
        </div>
    </div>
  )
}

export default Topbar