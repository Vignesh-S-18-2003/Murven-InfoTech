import React, { useState, useEffect } from 'react';
import PaymentPDF from './PaymentPDF';
import ProDetail from './ProDetail';

function Payment({ list, address, details }) {
  let totalAmt = list.reduce((total, product) => total + product.price * product.quantity, 0);
  const [cop, setCop] = useState('');
  const [style, setStyle] = useState({ color: '' });
  const [tot, setTot] = useState(0); // Initialize tot with 0

  const calculateAmount = () => {
    let totalAmount = list.reduce((total, product) => total + product.price * product.quantity, 0);
    const sgst = (totalAmount / 100) * 8;
    const cgst = (totalAmount / 100) * 7;
    const igst = (totalAmount / 100) * 9;
    let sum = totalAmount + sgst + cgst + igst;

    if (details.deliveryType === 'Express Delivery (+Rs 90)') {
      sum += 90;
    }
    if (details.paymentType === 'Cash on Delivery (+Rs 50)') {
      sum += 50;
    }

    return sum.toFixed(2);
  };

  useEffect(() => {
    const initialAmount = calculateAmount();
    setTot(initialAmount);
  }, []);
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === 'y') {
      setCop("Coupon is Valid");
      setStyle({ color: 'green' });
      setTot((prevAmount) => prevAmount - 25);
    } else if (val === "") {
      setCop('');
    } else {
      setCop('Coupon is Invalid');
      setStyle({ color: 'red' });
      setTot(calculateAmount()); 
    }
  };

  const handlePay=()=>{
    var options={
      key:"rzp_test_AdiGQG3cgsA1uM",
      key_secret:"r4bASMAWErlkS5AE1NcZ1jpM",
      amount:tot*100,
      currency:"INR",
      name:"Dreamik",
      description:"for testing purpose",
      handler:function(response){
        alert(response.razorpay_payment_id);
      },
      prefill:{
        name:"Dreamik",
        email:"vickykid250@gmail.com",
        contact:"8754582761"
      },
      notes:{
        address:"Razorpay Corporate Office"
      },
      theme:{
        color:"#3399cc"
      }
    };
    var pay=new window.Razorpay(options);
    pay.open();
  }
  
  return (
    <div className='payPage'>
      <h1>Confirmation Payment</h1>
      <h3>Name: {address.name}</h3>
      <h3>Amount: {totalAmt}</h3>
      <h3>GST Calculation:</h3>
      <h4>SGST: {((totalAmt / 100) * 8).toFixed(2)} </h4>
      <h4>CGST: {((totalAmt / 100) * 7).toFixed(2)}</h4>
      <h4>IGST: {((totalAmt / 100) * 9).toFixed(2)}</h4>
      <h3>Product Details:</h3>
      <table className='tbl'>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        {list.map((product) => (
          <ProDetail
            key={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </table>
      <h3>Mode Of Delivery: {details.deliveryType}</h3>
      <h3>Payment Type: {details.paymentType}</h3>
      <h3>Address: {address.addressLine1} {address.addressLine2} {address.addressLine3}</h3>
      <h3>Pincode: {address.pincode}</h3>
      <h2>Total Amount to pay: {tot}</h2>
      <h3>Enter Discount Coupon: <input type="text" placeholder="Enter Here" onChange={handleInputChange} /><span style={style}>{cop}</span></h3>
      <PaymentPDF address={address} totalAmount={tot} totalAmt={totalAmt} list={list} details={details} /><br/>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}

export default Payment;
