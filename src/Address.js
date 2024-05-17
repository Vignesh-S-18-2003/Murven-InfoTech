import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Address({ address, setAddress, pincode, setPincode }) {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [state, setState] = useState(false);

  const handlePincodeChange = async (e) => {
    const { value } = e.target;
    setPincode(value);

    // Fetch pincode serviceability information
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data[0] && data[0].PostOffice && data[0].PostOffice.length > 0) {
            const firstPostalCode = data[0].PostOffice[0];
            setDistrict(firstPostalCode.District);

            // Update the address state correctly
            setAddress((prevAddress) => ({
                ...prevAddress,
                pincode: value,
                district: firstPostalCode.District,
                state:firstPostalCode.State
            }));
            setState(true); // Enable address fields once pincode data is available
        } else {
            setState(false); // Disable address fields if no data found
        }
    } catch (error) {
        console.error('Error fetching pincode data:', error);
        setDistrict('');
        setState(false);
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', address);
    navigate('/delivery');
  };

  return (
    <div className="address-container">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit}>
        

        {state && (
          <>
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            id="customername"
            name="name"
            value={address.name}
            onChange={handleInputChange}
            required
          /><br/><br/>
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleInputChange}
              required
            /><br/><br/>

            <label htmlFor="addressLine2">Address Line 2:</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleInputChange}
            /><br/><br/>

            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              disabled
            /><br/><br/>

            <label htmlFor="state">State:</label>
            <select
              id="state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select State</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Telangana">Telangana</option>
            </select><br/><br/>
          </>
        )}
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={pincode}
          onChange={handlePincodeChange}
          pattern="[0-9]{6}"
          title="Enter 6-digit pincode"
          required
        /><br/><br/>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value="India"
          disabled
        /><br/><br/>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Address;
