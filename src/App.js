import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Main from './Main';
import Address from './Address';
import Product from './Product';
import Products from './Products';
import Dummy from './Dummy';
import Delivery from './Delivery';
import Payment from './Payment';
import PincodeServiceabilityChecker from './PincodeServiceAblityChecker';
import Order from './Order';

function App() {
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 20, quantity: 1 },
    { id: 2, name: 'Product B', price: 30, quantity: 1 }
  ]);
  const [address, setAddress] =useState({
    name:'',
    addressLine1: '',
    addressLine2: '',
    district: '',
    pincode: '',
    landmark: '',
    state: '',
    country: 'India'
});
const [pincode, setPincode] = useState('');
const [details, setDetails] = useState({
  day: '',
  time: '',
  deliveryType: '',
  paymentType: ''
});
const [total,setTotal]=useState(0);
  return(
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="products" element={<Products setList={setList} products={products} setProducts={setProducts} />}/>
          <Route path="address" element={<Address address={address} setAddress={setAddress} pincode={pincode} setPincode={setPincode}/>} />
          <Route path="delivery" element={<Delivery deliveryDetails={details} setDeliveryDetails={setDetails} />}/>
          <Route path="pay" element={<Payment list={list} address={address} details={details}setTotal={setTotal}/>}/>
          <Route path="order" element={<Order list={list} address={address} details={details} total={total}/>}/>
          <Route path="dummy" element={<PincodeServiceabilityChecker address={address} setAddress={setAddress} pincode={pincode}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
