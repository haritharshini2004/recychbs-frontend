// import React from 'react';
import React, { useState, useEffect } from 'react';
import Header from '../component/Header';

const Usernotification = () => {

  // const notifications = [
  //   { head: "dealer 1", title: "comment", message: "your order" },
  //   { head: "dealer 2", title: "comment", message: "your order" },
  //   { head: "dealer 3", title: "comment", message: "your order" },
  // ];

  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  // console.log(userDetails);
  
  useEffect(() => {
    // fetch('http://127.0.0.1:8000/Get_UserNotification/')
    fetch('http://127.0.0.1:8000/Get_Notification/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserDetails(data);
         // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching details:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);
  // console.log(userDetails);
  
  return (
 <>
 <Header/>
    <div className="container-fluid topbottom-user">
      <div className="loginn">
        {userDetails.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#777",
              margin: "10px",
              padding: "10px",
              color: "#fff",
            }}
          >
            <span>{item.id}</span>
            <span>{item.title}</span>
            <span>{item.message}</span>
          </div>
        ))}
      </div>
    </div>
 </>
  );
};

export default Usernotification;