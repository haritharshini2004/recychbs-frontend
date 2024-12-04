import React,{ useState, useEffect } from 'react';
import Headerdealer from '../component/Headerdealer';

const Dealernotification = () => {
  // const notifications = [
  //   { head: "dealer 1", title: "comment", message: "your order" },
  //   { head: "dealer 2", title: "comment", message: "your order" },
  //   { head: "dealer 3", title: "comment", message: "your order" },
  // ];

  const [notificationDetails, setnotificationDetails] = useState([]);

  useEffect(() => {
    // fetch('http://127.0.0.1:8000/Get_UserNotification/')
    fetch('https://www.recychbsadmin.in/Get_Notification/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setnotificationDetails(data);
         // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  }, []);


  return (
 <>
 <Headerdealer/>
    <div className="container-fluid topbottom">
      <div className="loginn">
        {notificationDetails.map((item, index) => (
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

export default Dealernotification;
