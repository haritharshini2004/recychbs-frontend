import React from 'react';

const Notification = () => {
  const notifications = [
    { head: "dealer 1", title: "comment", message: "your order" },
    { head: "dealer 2", title: "comment", message: "your order" },
    { head: "dealer 3", title: "comment", message: "your order" },
  ];

  return (
 <>
    <div className="container-fluid">
      <div className="loginn">
        {notifications.map((item, index) => (
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
            <span>{item.head}</span>
            <span>{item.title}</span>
            <span>{item.message}</span>
          </div>
        ))}
      </div>
    </div>
 </>
  );
};

export default Notification;
