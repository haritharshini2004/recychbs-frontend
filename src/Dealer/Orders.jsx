import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerdealer from '../component/Headerdealer';
import SortableTable from '../component/SortableTable';
import Alert from '../component/Alert';

const Orders = () => {
  const navigate = useNavigate();
  const [ongoingOrder, setOngoingOrder] = useState(null); 
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [sAlert, setShowAlert] = useState(false);

  const displayAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);  
  };

  const handleClose = () => {
    setShowAlert(false);  
    setAlertType('');   
    setAlertMessage('');  
  };

  const orderData = [
    {
      orderId: "ORD001",
      customerName: "Tharshini",
      address: "Thisayanvilai",
      orderDate: "2023-10-01",
      scarp: "2",
    },
    {
      orderId: "ORD002",
      customerName: "Shobi",
      address: "Murugesapuram",
      orderDate: "2023-10-02",
      scarp: "3",
    },
    {
      orderId: "ORD003",
      customerName: "Mahesh",
      address: "Thisayanvilai",
      orderDate: "2023-10-03",
      scarp: "4",
    },
    {
      orderId: "ORD004",
      customerName: "Kaviya",
      address: "Keraikaranthattu",
      orderDate: "2023-10-04",
      scarp: "5",
    },
    {
      orderId: "ORD005",
      customerName: "Snega",
      address: "Thattarmadam",
      orderDate: "2023-10-05",
      scarp: "6",
    },
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'orderId',
      },
      {
        Header: 'Customer Name',
        accessor: 'customerName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Order Date',
        accessor: 'orderDate',
      },
      {
        Header: 'No of Scrap',
        accessor: 'scarp',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <>
           <button
              onClick={() => handleAcceptOrder(row.original)}
              disabled={ongoingOrder !== null} // Disable if there's an ongoing order
              style={{
                backgroundColor: ongoingOrder !== null ? 'gray' : 'green',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: ongoingOrder !== null ? 'not-allowed' : 'pointer'
              }}
            >
              {ongoingOrder === row.original ? 'Accepted' : 'Accept'}
            </button>
          </>
        ),
      },
    ],
    [ongoingOrder] 
  );

  const handleAcceptOrder = (order) => {
    console.log('Current ongoing order:', ongoingOrder); 
    
    if (ongoingOrder !== null) {
      displayAlert('error', 'You can only process one order at a time.');
      console.log('You can only process one order at a time.', order);
      return;
    }
  
    displayAlert('success', 'Order accepted.');
    setOngoingOrder(order);
    console.log('Accepted order:', order);
  };
  

  const handleDeclineOrder = () => {
    if (ongoingOrder) {
      displayAlert('info ', `Order ${ongoingOrder.orderId} has been declined.`);
      setOngoingOrder(null);
      console.log('Declined order:', ongoingOrder);
    }
  };

  const data = React.useMemo(() => orderData, [orderData]);

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="card-box">
          <h2>Order List</h2>
          <SortableTable columns={columns} data={data} showSearch={true} showPagination={true} />
          
          {ongoingOrder && (
            <div>
              <h3>Ongoing Order</h3>
              <p>Order ID: {ongoingOrder.orderId}</p>
              <p>Customer Name: {ongoingOrder.customerName}</p>
              <p>Address: {ongoingOrder.address}</p>
              <p>Order Date: {ongoingOrder.orderDate}</p>
              <button onClick={handleDeclineOrder} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                Decline
              </button>
            </div>
          )}
        </div>
      </div>

      {sAlert && (
        <Alert 
          type={alertType} 
          message={alertMessage} 
          onClose={handleClose} 
        />
      )}
    </>
  );
};

export default Orders;