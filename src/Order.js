import React from 'react'

function Order({address,list,total}) {
  return (
    <div className='payPage'>
        <h1>Cash On Delivery</h1>
        <h3>Name:{address.name}</h3>
        { list[0].quantity>0??<h3>Product A : {list[0].quantity}</h3>}
        { list[1].quantity>0??<h3>Product B : {list[1].quantity}</h3>}
        <h3>Address:{address.addressLine1} + {address.addressLine2}</h3>
        <h3>         Pincode:{address.pincode}</h3>
        <h3>         </h3>
        <h1>Total Amount to Pay:{total}</h1>
    </div>
  )
}

export default Order