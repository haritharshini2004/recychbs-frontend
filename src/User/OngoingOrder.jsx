import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SortableTable from "../component/SortableTable"; // Import your SortableTable component
import Header from "../component/Header";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function OngoingOrder() {
  const location = useLocation();

  // Dealer information
  const dealerInfo = {
    name: "Jane Smith",
    phoneNumber: "9872635412",
    location: "Chennai",
    arrivalTime: new Date().toLocaleTimeString(), // Example time, you might want to set it dynamically
    goOutTime: "", // Set this dynamically based on your application logic
  };


  const [bill, setBill] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [scrapItems, setScrapItems] = useState([
    {
      scrapType: 'Glass',
      scrapCondition: 'Good',
      collectedDate: '2023-10-04',
      amountPerUnit: 80,
      weight: '30kg',
      status: 'In Transit',
    },
    {
      scrapType: 'Metal',
      scrapCondition: 'Fair',
      collectedDate: '2023-10-05',
      amountPerUnit: 70,
      weight: '25kg',
      status: 'Scheduled',
    },
    {
      scrapType: 'Plastic',
      scrapCondition: 'Poor',
      collectedDate: '2023-10-06',
      amountPerUnit: 50,
      weight: '20kg',
      status: 'Pending Pickup',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    scrapType: '',
    scrapCondition: '',
    collectedDate: '',
    amountPerUnit: 0,
    status: 'New',
  });

  const [goOutTime, setGoOutTime] = useState(""); // State for Go Out Time

  const toggleModal = () => setShowModal(!showModal);

  const addScrapItem = () => {
    setScrapItems([...scrapItems, newItem]);
    setNewItem({
      scrapType: '',
      scrapCondition: '',
      collectedDate: '',
      amountPerUnit: 0,
      status: 'New',
    });
    toggleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'S.No', accessor: 'serialNumber' },
      { Header: 'Scrap', accessor: 'scrapType' },
      { Header: 'Scrap Condition', accessor: 'scrapCondition' },
      { Header: 'Collected Date', accessor: 'collectedDate' },
      { Header: 'Amount per 1 Kg', accessor: 'amountPerUnit' },
      { Header: 'Quantity(Kg)', accessor: 'quantity' },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      scrapItems.map((item, index) => ({
        serialNumber: index + 1,
        scrapType: item.scrapType || 'N/A',
        scrapCondition: item.scrapCondition || 'N/A',
        collectedDate: item.collectedDate || 'N/A',
        amountPerUnit: item.amountPerUnit || 'N/A',
        weight: item.weight || 'N/A',
        quantity: (
          <input
            type="number"
            min="0"
            value={quantity[index] || ""}
            onChange={(e) => setQuantity({ ...quantity, [index]: e.target.value })}
            className="form-control"
          />
        ),
      })),
    [scrapItems, quantity]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = scrapItems.reduce((acc, item, index) => {
      const qty = Number(quantity[index]) || 0;
      return acc + (qty * item.amountPerUnit);
    }, 0);

    const details = scrapItems.map((item, index) => ({
      scrapType: item.scrapType,
      scrapCondition: item.scrapCondition,
      amountPerUnit: item.amountPerUnit,
      quantity: quantity[index] || 0,
      total: (quantity[index] || 0) * item.amountPerUnit,
    }));

    setBill({
      dealer: dealerInfo.name,
      ph: dealerInfo.phoneNumber,
      location: dealerInfo.location,
      totalAmount,
      date: new Date().toLocaleDateString(),
      details,
    });
  };

  const printBill = () => {
    if (!bill) return;

    const billContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12pt;
              margin: 1in ;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .bill-summary {
              margin-bottom: 20px;
            }
            .scrap-details {
              margin-bottom: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RECYCHBS</h1>
          </div>
          <div class="bill-summary">
            <p><strong>Dealer:</strong> ${bill.dealer}</p>
            <p><strong>Phone Number:</strong> ${bill.ph}</p>
            <p><strong>Location:</strong> ${bill.location}</p>
            <p><strong>Arrival Time:</strong> ${dealerInfo.arrivalTime}</p>
            <p><strong>Out Time:</strong> ${goOutTime || "Not Set"}</p>
            <p><strong>Total Amount:</strong> ₹${bill.totalAmount}</p>
            <p><strong>Date:</strong> ${bill.date}</p>
          </div>
          <div class="scrap-details">
            <h2>Scrap Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Scrap</th>
                  <th>Scrap Condition</th>
                  <th>Amount per Unit</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${bill.details && bill.details.length > 0 ? bill.details.map((detail) => `
                  <tr>
                    <td>${detail.scrapType}</td>
                    <td>${detail.scrapCondition}</td>
                    <td>₹${detail.amountPerUnit}</td>
                    <td>${detail.quantity}</td>
                    <td>₹${detail.total}</td>
                  </tr>
                `).join('') : '<tr><td colspan="6">No scrap details available.</td></tr>'}
              </tbody>
            </table>
          </div>
          <div class="footer">
            <p>Thank you!</p>
            <p>RECYCHBS</p>
          </div>
        </body>
      </html>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(billContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div className="">
          <h2>Ongoing Order Details</h2>
          <div className="dealer-container row">
            <div className="dealer-info col-12 col-lg-8 col-md-12 col-sm-12">
              <h5>Dealer Information</h5>
              <p><strong>Name:</strong> {dealerInfo.name}</p>
              <p><strong>Phone Number:</strong> {dealerInfo.phoneNumber}</p>
              <p><strong>Location:</strong> {dealerInfo.location}</p>
            </div>
            <div className="otp-display col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="otp-box">
                <p>Your OTP is:</p>
                <div className="otp-digits">566757</div>
              </div>
            </div>
          </div>

   <div className="dealer-container row">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: '300px', width: '100%' }}
              center={{ lat: 13.0827, lng: 80.2707 }}
              zoom={10}
              onLoad={(map) => console.log('Map Loaded')}
              onUnmount={(map) => console.log('Map Unmounted')}
            >
            </GoogleMap>
          </LoadScript>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop:"20px" }}>
            <button className="ongoing-addscrap-btn" onClick={toggleModal}>
              <i className="fa fa-plus"></i> Add Scrap Item
            </button>
          </div>

          {showModal && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Scrap Item</h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label>Scrap Type</label>
                        <select
                          name="scrapType"
                          value={newItem.scrapType}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="">Select Scrap Type</option>
                          <option value="Glass">Glass</option>
                          <option value="Metal">Metal</option>
                          <option value="Plastic">Plastic</option>
                          <option value="Paper">Paper</option>
                          <option value="Electronic">Electronic</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Scrap Condition</label>
                        <input type="text" name="scrapCondition" value={newItem.scrapCondition} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Collected Date</label>
                        <input type="date" name="collectedDate" value={newItem.collectedDate} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Amount per Kg</label>
                        <input type="number" name="amountPerUnit" value={newItem.amountPerUnit} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <input type="text" name="status" value={newItem.status} onChange={handleChange} className="form-control" />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="ongoing-addscrap-btn" onClick={addScrapItem}>Add Item</button>
                    <button type="button" className="ongoing-modal-cls-btn" onClick={toggleModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mb-3">
            <SortableTable columns={columns} data={data} showSearch={false} showPagination={true} />
            <button type="submit" className="ongoing-addscrap-btn mt-2">Submit</button>
          </form>

          {bill && (
            <div className="bill-info mt-3">
              <h5>Bill Summary</h5>
              <p><strong>Dealer:</strong> {bill.dealer}</p>
              <p><strong>Total Amount:</strong> ₹{bill.totalAmount}</p>
              <p><strong>Date:</strong> {bill.date}</p>
              <h6>Scrap Details:</h6>
              <ul>
                {bill.details.map((detail, index) => (
                  <li key={index}>{detail.scrapType} - {detail.quantity} Kg @ ₹{detail.amountPerUnit}/Kg = ₹{detail.total}</li>
                ))}
              </ul>
              <button className="btn btn-success" onClick={printBill}>Print Bill</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OngoingOrder;
