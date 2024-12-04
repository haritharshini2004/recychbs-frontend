import React, { useEffect, useState } from 'react';
import Headerdealer from '../component/Headerdealer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../component/Header';

const Usereditdetail = () => {
  const [dealerDetails, setDealerDetails] = useState(null);
  const [originalDetails, setOriginalDetails] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [buttonState, setButtonState] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    const fetchDealerDetails = async () => {
      const data = {
        name: "John Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        doorNo: "123",
        street: "Main St",
        country: "CountryName",
        state: "StateName",
        city: "Springfield",
        pincode: "123456",
      };
      setDealerDetails(data);
      setOriginalDetails(data);
    };

    fetchDealerDetails();
  }, []);

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

  const validateFields = () => {
    const requiredFields = ['name', 'phone', 'email', 'doorNo', 'street', 'country', 'state', 'city', 'pincode'];
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

  return (
    <>
       <Header />
       <div className="container-fluid topbottom-user">
        <h1 style={styles.header}>Edit Your Account Details</h1>
        <div style={styles.cardContainer}>
          <DetailCard title="Name" field="name" />
          <DetailCard title="Contact No" field="phone" />
          <DetailCard title="Email" field="email" />
          <DetailCard title="Door No" field="doorNo" />
          <DetailCard title="Street" field="street" />
          <DetailCard title="Country" field="country" />
          <DetailCard title="State" field="state" />
          <DetailCard title="City" field="city" />
          <DetailCard title="Pincode" field="pincode" />
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // padding: '20px 20px 80px 20px',
    // maxWidth: '1400px',
    // margin: '90px auto 0',
    // overflow: 'hidden',
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
  input: {
    width: '100%',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
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
};

export default Usereditdetail;