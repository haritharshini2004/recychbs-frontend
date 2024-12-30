import React, { useState } from 'react';

function BankAccountDetails() {
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branch: '',
    phoneNumber: '',  // New input field for phone number
  });

  const [image, setImage] = useState(null); // State for the image file
  const [responseMessage, setResponseMessage] = useState('');

  // Handle form input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send both text data and image file
    const formData = new FormData();
    formData.append('accountHolderName', accountDetails.accountHolderName);
    formData.append('accountNumber', accountDetails.accountNumber);
    formData.append('bankName', accountDetails.bankName);
    formData.append('branch', accountDetails.branch);
    formData.append('phoneNumber', accountDetails.phoneNumber);  // New phone number field
    formData.append('image', image);  // Append the image file

    try {
    //   const response = await fetch('http://localhost:8000/update-bank-account/', {
      const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/update-bank-account/', {
        method: 'POST',
        body: formData,  // Send FormData
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Account details submitted successfully!');
        console.log('Account details submitted:', data);
      } else {
        setResponseMessage('Failed to submit account details.');
        console.error('Error submitting account details:', response.statusText);
      }
    } catch (error) {
      setResponseMessage('Error sending account details.');
      console.error('Error submitting account details:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Bank Account Details Form</h2>
      {responseMessage && <p>{responseMessage}</p>} {/* Display backend response */}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={accountDetails.accountHolderName}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={accountDetails.accountNumber}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={accountDetails.bankName}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={accountDetails.branch}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Phone Number</label> {/* New Phone Number Input */}
          <input
            type="text"
            name="phoneNumber"
            value={accountDetails.phoneNumber}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Upload Image</label> {/* Image Upload Field */}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <button type="submit" style={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BankAccountDetails;