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

function App() {
  const [list, setList] = useState([]);
  const [address, setAddress] =useState({
    addressLine1: '',
    addressLine2: '',
    district: '',
    pincode: '',
    city:'',
    landmark: '',
    state: '',
    country: 'India'
});
const [details, setDetails] = useState({
  day: '',
  time: '',
  deliveryType: '',
  paymentType: ''
});
  return(
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="products" element={<Products setList={setList} />}/>
          <Route path="address" element={<Address address={address} setAddress={setAddress} />} />
          <Route path="delivery" element={<Delivery deliveryDetails={details} setDeliveryDetails={setDetails} />}/>
          <Route path="pay" element={<Payment list={list} address={address} details={details}/>}/>
          <Route path="dummy" element={<PincodeServiceabilityChecker address={address} setAddress={setAddress}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
