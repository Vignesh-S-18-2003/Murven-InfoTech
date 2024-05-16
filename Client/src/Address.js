import React from 'react';
import { useNavigate } from 'react-router-dom';

function Address({ address, setAddress }) {
  const navigate = useNavigate();

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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
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

        <label htmlFor="addressLine3">Address Line 3:</label>
        <input
          type="text"
          id="addressLine3"
          name="addressLine3"
          value={address.addressLine3}
          onChange={handleInputChange}
        /><br/><br/>

        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleInputChange}
          pattern="[0-9]{6}"
          title="Enter 6-digit pincode"
          required
        /><br/><br/>

        <label htmlFor="landmark">Landmark:</label>
        <input
          type="text"
          id="landmark"
          name="landmark"
          value={address.landmark}
          onChange={handleInputChange}
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

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={address.country}
          disabled
        /><br/><br/>

        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Address;
