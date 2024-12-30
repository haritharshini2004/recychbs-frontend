import React, { useEffect, useState } from 'react';
import Headerdealer from '../../component/Headerdealer';

const Dealeraccount = () => {
  const [dealerDetails, setDealerDetails] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/fetchDealerEditDetails/');
        const dealer_data = await response.json();
        const data = {
          name: dealer_data.name,
          dob: dealer_data.dob,
          phone: dealer_data.phone,
          aadhar: { number: dealer_data.aadhar, front: dealer_data.files.aadharFrontImage, back:dealer_data.files.aadharBackImage },
          pan: { number: dealer_data.pan, file: dealer_data.files.panImage },
          license: { number: dealer_data.license, front: dealer_data.files.licenseFrontImage, back: dealer_data.files.licenseBackImage },
          rcBook: { file: dealer_data.files.rcBookImage },
          bankStatement: { file: dealer_data.files.bankStatement },
          bankPassbook: { file: dealer_data.files.passbook },
          vehicleNumber: dealer_data.vehicleNumber,
          vehicleType: dealer_data.vehicleType,
          bankBookNo: dealer_data.bankBookNo,
          ifscCode: dealer_data.ifscCode,
          bankusername: dealer_data.bankusername,
          address: dealer_data.address,
          city: dealer_data.city,
          state: dealer_data.state,
          pincode: dealer_data.pincode,
          nationality:dealer_data.nationality,
        };
        setDealerDetails(data);
        console.log("Received data: ", data);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
      }

    };

    fetchDealerDetails();
  }, []);

  const openPdfInNewWindow = (pdf) => {
    window.open(pdf, '_blank');
  };

  if (!dealerDetails) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const DetailCard = ({ title, children }) => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{title}:</h2>
      {children}
    </div>
  );

  return (
    <>
      <Headerdealer />
      <div style={styles.container}>
        <h1 style={styles.header}>Your Account Details</h1>
       
        {/* Account Details Section */}
        <div style={styles.section}>
          <div style={styles.cardContainer}>
            <DetailCard title="Name">
              <p>{dealerDetails.name}</p>
            </DetailCard>
            <DetailCard title="Date of Birth">
              <p>{dealerDetails.dob}</p>
            </DetailCard>
            <DetailCard title="Phone No">
              <p>{dealerDetails.phone}</p>
            </DetailCard>
            <DetailCard title="Aadhar Number">
              <p>{dealerDetails.aadhar.number}</p>
            </DetailCard>
            <DetailCard title="PAN Number">
              <p>{dealerDetails.pan.number}</p>
            </DetailCard>
            <DetailCard title="License Number">
              <p>{dealerDetails.license.number}</p>
            </DetailCard>
            <DetailCard title="Vehicle Number">
              <p>{dealerDetails.vehicleNumber}</p>
            </DetailCard>
            <DetailCard title="Vehicle Type">
              <p>{dealerDetails.vehicleType}</p>
            </DetailCard>
            <DetailCard title="Bank Username">
              <p>{dealerDetails.bankusername}</p>
            </DetailCard>
            <DetailCard title="Bank Account No">
              <p>{dealerDetails.bankBookNo}</p>
            </DetailCard>
            <DetailCard title="IFSC Code">
              <p>{dealerDetails.ifscCode}</p>
            </DetailCard>
            <DetailCard title="Address">
              <p>{dealerDetails.address}</p>
            </DetailCard>
            <DetailCard title="City">
              <p>{dealerDetails.city}</p>
            </DetailCard>
            <DetailCard title="State">
              <p>{dealerDetails.state}</p>
            </DetailCard>
            <DetailCard title="Nationality">
              <p>{dealerDetails.nationality}</p>
            </DetailCard>
            <DetailCard title="Pincode">
              <p>{dealerDetails.pincode}</p>
            </DetailCard>
          </div>
        </div>
        
        {/* Documents Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Documents</h2>
          <div style={styles.cardContainer}>
            {/* Aadhar Card */}
            <DetailCard title="Aadhar Card Image">
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onMouseEnter={() => setHoveredButton('aadharFront')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => openPdfInNewWindow(dealerDetails.aadhar.front)}
                  style={{ ...styles.button, ...(hoveredButton === 'aadharFront' ? styles.buttonHover : {}) }}>
                  Front
                </button>
                <button
                  onMouseEnter={() => setHoveredButton('aadharBack')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => openPdfInNewWindow(dealerDetails.aadhar.back)}
                  style={{ ...styles.button, ...(hoveredButton === 'aadharBack' ? styles.buttonHover : {}) }}>
                  Back
                </button>
              </div>
            </DetailCard>

            {/* License */}
            <DetailCard title="License Image">
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onMouseEnter={() => setHoveredButton('licenseFront')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => openPdfInNewWindow(dealerDetails.license.front)}
                  style={{ ...styles.button, ...(hoveredButton === 'licenseFront' ? styles.buttonHover : {}) }}>
                  Front
                </button>
                <button
                  onMouseEnter={() => setHoveredButton('licenseBack')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => openPdfInNewWindow(dealerDetails.license.back)}
                  style={{ ...styles.button, ...(hoveredButton === 'licenseBack' ? styles.buttonHover : {}) }}>
                  Back
                </button>
              </div>
            </DetailCard>

            {/* PAN Card */}
            <DetailCard title="PAN Card Image">
              <button
                onMouseEnter={() => setHoveredButton('pan')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => openPdfInNewWindow(dealerDetails.pan.file)}
                style={{ ...styles.button, ...(hoveredButton === 'pan' ? styles.buttonHover : {}) }}>
                View PAN Card
              </button>
            </DetailCard>

            {/* RC Book */}
            <DetailCard title="RC Book Image">
              <button
                onMouseEnter={() => setHoveredButton('rcBook')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => openPdfInNewWindow(dealerDetails.rcBook.file)}
                style={{ ...styles.button, ...(hoveredButton === 'rcBook' ? styles.buttonHover : {}) }}>
                View RC Book
              </button>
            </DetailCard>

            {/* Bank Statement */}
            <DetailCard title="Bank Statement">
              <button
                onMouseEnter={() => setHoveredButton('bankStatement')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => openPdfInNewWindow(dealerDetails.bankStatement.file)}
                style={{ ...styles.button, ...(hoveredButton === 'bankStatement' ? styles.buttonHover : {}) }}>
                View Bank Statement
              </button>
            </DetailCard>

            {/* Bank Passbook */}
            <DetailCard title="Bank Passbook">
              <button
                onMouseEnter={() => setHoveredButton('bankPassbook')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => openPdfInNewWindow(dealerDetails.bankPassbook.file)}
                style={{ ...styles.button, ...(hoveredButton === 'bankPassbook' ? styles.buttonHover : {}) }}>
                View Bank Passbook
              </button>
            </DetailCard>
          </div>
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
    fontSize: '2em',
  },
  section: {
    marginBottom: '40px',
  },
  sectionHeader: {
    fontSize: '1.5em',
    marginBottom: '15px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    margin: '0 0 10px',
    fontSize: '1.2em',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5em',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default Dealeraccount;
