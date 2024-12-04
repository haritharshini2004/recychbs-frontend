import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';



const Useraccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('https://www.recychbsadmin.in/GetUserDetails/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserDetails(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching details:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const DetailCard = ({ title, children }) => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{title}:</h2>
      {children}
    </div>
  );
  return (
    <>
      <Header />
      <div style={{marginTop:'70px'}}>
        <h1 style={{display:'flex',justifyContent:'center'}}>Your Account Details</h1>
        {loading ? ( // Conditional rendering based on loading state
          <p>Loading user details...</p>
        ) : (
          userDetails && (
            <div style={styles.cardContainer}>
              <DetailCard title="Name">
                <p>{userDetails.User_Name}</p>
              </DetailCard>
              <DetailCard title="Contact Number">
                <p>{userDetails.Phone_Number}</p>
              </DetailCard>
              <DetailCard title="Email Address">
                <p>{userDetails.Email}</p>
              </DetailCard>
              <DetailCard title="Door No">
                <p>{userDetails.Door_No}</p>
              </DetailCard>
              <DetailCard title="Street">
                <p>{userDetails.Street}</p>
              </DetailCard>
              <DetailCard title="City">
                <p>{userDetails.City}</p>
              </DetailCard>
              <DetailCard title="State">
                <p>{userDetails.State}</p>
              </DetailCard>
              <DetailCard title="Country">
                <p>{userDetails.Country}</p>
              </DetailCard>
              <DetailCard title="Pincode">
                <p>{userDetails.Pincode}</p>
              </DetailCard>
            </div>
          )
        )}
      </div>
    </>
  );
};

const styles = {
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
    marginLeft:'20px',
    marginRight:'20px'
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
};

export default Useraccount;