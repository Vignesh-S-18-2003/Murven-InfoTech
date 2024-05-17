import React, { useState, useEffect } from 'react';
import PaymentPDF from './PaymentPDF';
import ProDetail from './ProDetail';
import { useNavigate } from 'react-router-dom';

function Payment({ list, address, details, setTotal }) {
  const [cop, setCop] = useState('');
  const [style, setStyle] = useState({ color: '' });
  const [tot, setTot] = useState(0); 
  const navigate = useNavigate();

  const calculateAmount = () => {
    let totalAmount = list.reduce((total, product) => total + product.price * product.quantity, 0);
    const sgst = (totalAmount / 100) * 9;
    const cgst = (totalAmount / 100) * 9;
    let igst = 0;
    let sum = totalAmount + sgst + cgst;

    if (address.state === "Tamil Nadu") {
      igst = (totalAmount / 100) * 18;
      sum = totalAmount + igst;
    }

    if (details.deliveryType === 'Express Delivery (+ ₹90)') {
      sum += 140;
    } else {
      sum += 50;
    }

    if (details.paymentType === 'Cash on Delivery (+ ₹50)') {
      sum += 50;
    }

    setTotal(sum.toFixed(2));
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
      setTot((prevAmount) => (prevAmount - 25).toFixed(2));
    } else if (val === "") {
      setCop('');
    } else {
      setCop('Coupon is Invalid');
      setStyle({ color: 'red' });
      setTot(calculateAmount());
    }
  };

  const handleOrder = () => {
    navigate('/order');
  };

  const handlePay = () => {
    const valu = calculateAmount();
    setTot(valu);
    var options = {
      key: "rzp_test_AdiGQG3cgsA1uM",
      key_secret: "r4bASMAWErlkS5AE1NcZ1jpM",
      amount: valu * 100,
      currency: "INR",
      name: "Dreamik",
      description: "for testing purpose",
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Dreamik",
        email: "vickykid250@gmail.com",
        contact: "8754582761"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className='payPage'>
      <h1>Confirmation Payment</h1>
      <h3>Name: {address.name}</h3>
      <h3>Amount: {list.reduce((total, product) => total + product.price * product.quantity, 0)}</h3>
      <h3>GST Calculation:</h3>
      {address.state === "Tamil Nadu" ? (
        <>
          <h4>SGST: {((list.reduce((total, product) => total + product.price * product.quantity, 0) / 100) * 9).toFixed(2)}</h4>
          <h4>CGST: {((list.reduce((total, product) => total + product.price * product.quantity, 0) / 100) * 9).toFixed(2)}</h4>
        </>
      ) : (
        <h4>IGST: {((list.reduce((total, product) => total + product.price * product.quantity, 0) / 100) * 18).toFixed(2)}</h4>
      )}
      <table className='tbl'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <ProDetail
              key={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </tbody>
      </table>
      <h3>Mode Of Delivery: {details.deliveryType}</h3>
      <h3>Payment Type: {details.paymentType}</h3>
      <h3>Address: {address.addressLine1} {address.addressLine2} {address.addressLine3}</h3>
      <h3>Pincode: {address.pincode}</h3>
      <h2>Total Amount to pay: {tot}</h2>
      <h2>Shipping Charges: ₹50</h2>
      <h3>Enter Discount Coupon: <input type="text" placeholder="Enter Here" onChange={handleInputChange} /><span style={style}>{cop}</span></h3>
      <PaymentPDF address={address} totalAmount={tot} totalAmt={list.reduce((total, product) => total + product.price * product.quantity, 0)} list={list} details={details} /><br />
      {details.paymentType !== 'Cash on Delivery (+ ₹50)' ? <button onClick={handlePay}>Pay Now</button> : <button onClick={handleOrder}>Order Now</button>}
    </div>
  );
}

export default Payment;
