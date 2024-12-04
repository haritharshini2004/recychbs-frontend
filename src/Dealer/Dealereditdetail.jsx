import React, { useEffect, useState } from 'react';
import Headerdealer from '../component/Headerdealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dealereditdetail = () => {
  const [dealerDetails, setDealerDetails] = useState(null);
  const [originalDetails, setOriginalDetails] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [buttonState, setButtonState] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFields, setInvalidFields] = useState({});
  
  // Handle form submission to update the dealer details
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === `${name}=`) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    try {
      const response = await fetch('https://www.recychbsadmin.in/updateDealerDetails/', {
        method: 'POST', // or 'PUT' depending on your backend logic
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(dealerDetails),  // Send the updated dealer details
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Successfully updated dealer details:', result);
        // Optionally handle success (e.g., show a success message)
      } else {
        console.error('Failed to update dealer details');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  console.log("original Details:",originalDetails);
  console.log("dealer Details:",dealerDetails);
  console.log("Editing Details:",editingField);

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await fetch('https://www.recychbsadmin.in/fetchDealerEditDetails/');
        const dealer_data = await response.json();
        
        const data = {
          name: dealer_data.name,
          dob: dealer_data.dob,
          phone: dealer_data.phone,
          aadhar: dealer_data.aadhar,
          pan: dealer_data.pan,
          license: dealer_data.license,
          vehicleNumber: dealer_data.vehicleNumber,
          vehicleType: dealer_data.vehicleType,
          bankBookNo: dealer_data.bankBookNo,
          ifscCode: dealer_data.ifscCode,
          bankusername: dealer_data.bankusername,
          address: dealer_data.address,
          city: dealer_data.city,
          state: dealer_data.state,
          pincode: dealer_data.pincode,
          nationality: dealer_data.nationality,
          files: {
            bankStatement: null,  // Update or leave as null for now
            aadharFrontImage: null,
            aadharBackImage: null,
            panImage: null,
            licenseFrontImage: null,
            licenseBackImage: null,
            rcBookImage: null,
            passbook: null,
          }
        };
        setDealerDetails(data);
        setOriginalDetails(data);

        console.log("Received data: ", data);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
      }
    };

    fetchDealerDetails();
  }, []);  // Empty array ensures the useEffect runs only once when the component mounts

  const handleEdit = (field) => {
    if (editingField === null) {
      setEditingField(field);
    }
  };

  const handleChange = (field, value) => {
    setDealerDetails((prev) => ({ ...prev, [field]: value }));
    setInvalidFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
  
    if (file) {
      // You can set the file as a blob or URL
      setDealerDetails((prev) => ({
        ...prev,
        files: { ...prev.files, [field]: file }, // Store the file object for later viewing
      }));
  
      // If you want to directly store a URL
      // setDealerDetails((prev) => ({
      //   ...prev,
      //   files: { ...prev.files, [field]: URL.createObjectURL(file) }, // Store the URL directly
      // }));
    }
  };
  
  
  const handleViewFile = (field) => {
    const file = dealerDetails.files[field];
  
    if (!file) {
      alert('No file uploaded.');
      return;
    }
  
    // Check if the file is a URL
    if (typeof file === 'string') {
      window.open(file, '_blank'); // Open the URL directly
    } else if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file); // Create a URL for the file
      window.open(fileURL, '_blank'); // Open in a new tab
    } else {
      alert('This file type cannot be viewed directly.');
    }
  };
  
  
  

  const handleRemoveFile = (field) => {
    setDealerDetails((prev) => ({
      ...prev,
      files: { ...prev.files, [field]: null },
    }));
  };
  

  
  
  const validateFields = () => {
    const requiredFields = [
      'name', 'dob', 'phone', 'aadhar', 'pan',
      'license', 'vehicleNumber', 'bankBookNo',
      'ifscCode', 'bankusername', 'address', 
      'city', 'state', 'pincode', 'nationality', 'vehicleType'
    ];

    const invalid = {};
    const messages = [];

    for (const field of requiredFields) {
      if (!dealerDetails[field]) {
        invalid[field] = true;
        messages.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
      }
    }

    setInvalidFields(invalid);
    setErrorMessage(messages.join(' '));
    return Object.keys(invalid).length > 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      return;
    }

    setOriginalDetails(dealerDetails);
    setButtonState('save');
    setErrorMessage('');
    setTimeout(() => setButtonState(null), 300);
    setEditingField(null);
  };

  const handleCancel = () => {
    setDealerDetails(originalDetails);
    setButtonState('cancel');
    setErrorMessage('');
    setTimeout(() => setButtonState(null), 300);
    setEditingField(null);
  };

  if (!dealerDetails) {
    return <div style={styles.loading}>Loading...</div>;
  }


  const DetailCard = ({ title, field }) => {
    const isEditable = editingField === field;
    const isInvalid = invalidFields[field];

    return (
      <div
        style={{
          ...styles.card,
          border: isInvalid ? '1px solid red' : '1px solid #ccc',
          position: 'relative',
        }}
      >
        <h2 style={styles.cardTitle}>{title}:</h2>
        {isEditable ? (
          <>
            <input
              type="text"
              value={dealerDetails[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={handleBlur}
              style={styles.input}
              autoFocus
            />
            <FontAwesomeIcon 
              icon={faCheck} 
              onClick={handleSave} 
              style={{ ...styles.icon, ...styles.checkIcon }} 
            />
          </>
        ) : (
          <>
            <p>{dealerDetails[field]}</p>
            <FontAwesomeIcon 
              icon={faEdit} 
              onClick={() => handleEdit(field)} 
              style={{ ...styles.icon, ...styles.editIcon }} 
            />
          </>
        )}
      </div>
    );
  };

  const FileCard = ({ title, field }) => {
    const file = dealerDetails.files[field];
  
    return (
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{title}:</h2>
        {file ? (
          <>
            {file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt={title} style={styles.image} />
            ) : file.type === 'application/pdf' ? (
              <p>
                PDF uploaded. Click to view: 
                <a 
                  href={URL.createObjectURL(file)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.pdfLink}
                >
                  View PDF
                </a>
              </p>
            ) : file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
              <p>
                Document uploaded. Click to view: 
                <a 
                  href={URL.createObjectURL(file)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.pdfLink}
                >
                  View Document
                </a>
              </p>
            ) : (
              <p>Unsupported file type uploaded.</p>
            )}
            <div style={styles.fileActions}>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleViewFile(field)}
                style={{ ...styles.img_icon, ...styles.viewIcon }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleRemoveFile(field)}
                style={{ ...styles.img_icon, ...styles.removeIcon }}
              />
            </div>
          </>
        ) : (
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" // Restrict file types here
            onChange={(e) => handleFileChange(field, e)}
            style={styles.fileInput}
          />
        )}
      </div>
    );
  };
  
  
  

  return (
    <>
      <Headerdealer />
      <div style={styles.container}>
        <h1 style={styles.header}>Edit Your Account Details</h1>
        <div style={styles.cardContainer}>
          <DetailCard title="Name" field="name" />
          <DetailCard title="Date of Birth" field="dob" />
          <DetailCard title="Phone No" field="phone" />
          <DetailCard title="Bank Account No" field="bankBookNo" />
          <DetailCard title="IFSC Code" field="ifscCode" />
          <DetailCard title="Bank Username" field="bankusername" />
          <DetailCard title="Address" field="address" />
          <DetailCard title="City" field="city" />
          <DetailCard title="State" field="state" />
          <DetailCard title="Nationality" field="nationality" />
          <DetailCard title="Pincode" field="pincode" />
          <DetailCard title="Vehicle Type" field="vehicleType" />
          <DetailCard title="Aadhar Number" field="aadhar" />
          <DetailCard title="PAN Number" field="pan" />
          <DetailCard title="License No" field="license" />
          <DetailCard title="Vehicle Number" field="vehicleNumber" />
          <FileCard title="Bank Pass Book" field="passbook" />
          <FileCard title="Bank Statement" field="bankStatement" />
          <FileCard title="Aadhar Front Image" field="aadharFrontImage" />
          <FileCard title="Aadhar Back Image" field="aadharBackImage" />
          <FileCard title="PAN Image" field="panImage" />
          <FileCard title="License Front Image" field="licenseFrontImage" />
          <FileCard title="License Back Image" field="licenseBackImage" />
          <FileCard title="RC Book Image" field="rcBookImage" />
        </div>
        <div onClick={handleSubmit} className="submit-button">
                Submit
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px 80px 20px',
    maxWidth: '1400px',
    margin: '90px auto 0',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '32px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',  
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  cardTitle: {
    margin: '0 0 10px',
    fontSize: '19px',
    color: '#000',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '10px',
    borderRadius: '4px',
  },
  input: {
    width: '100%',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  fileInput: {
    marginTop: '10px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '24px',
  },
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    fontSize: '20px',
  },
  checkIcon: {
    top: '15px',
    right: '15px',
    color: '#28a745',
  },
  editIcon: {
    top: '15px',
    right: '15px',
    color: '#007BFF',
  },
  fileActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  img_icon: {
    cursor: 'pointer',
    fontSize: '24px',
    margin: '0 5px',
    transition: 'color 0.3s, transform 0.3s',
  },
  viewIcon: {
    color: '#007BFF',
    '&:hover': {
      color: '#0056b3',
      transform: 'scale(1.1)',
    },
  },
  removeIcon: {
    color: '#dc3545',
    '&:hover': {
      color: '#c82333',
      transform: 'scale(1.1)',
    },
  },
   pdfLink: {
    color: '#007BFF',
    textDecoration: 'underline',
    marginLeft: '5px',
  },
};

export default Dealereditdetail;
