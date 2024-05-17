import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Product from './Product';

function Products({setList, products,setProducts}) {
    const navigate=useNavigate();
 

  const handleIncrease = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    const selectedProducts = products.filter((product) => product.quantity > 0);
    setList(selectedProducts);
    navigate('/address'); // Navigate to the '/address' route after checkout
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
          {products.map((product) => (
              <Product
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                onIncrease={() => handleIncrease(product.id)}
                onDecrease={() => handleDecrease(product.id)}
              />
          ))}
      </table>
      <h3>Total: Rs {products.reduce((total, product) => total + product.price * product.quantity, 0)}</h3>
      
      {products.length > 0 && (
        <h3 className="check" onClick={handleCheckout}>
          CheckOut
        </h3>
      )}
      </div>
  )
}

export default Products