import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";
import { FaTrash } from 'react-icons/fa';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Scrapdetail() {
  const [scrapType, setScrapType] = useState("");
  const [OtherScrapType, setOtherScrapType] = useState("");
  const [scrapQuality, setScrapQuality] = useState("");
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [adminPhone] = useState([
    { username: "username", address: "123 Main St", phoneno: "7878787878" },
  ]);
  const [scrapEntries, setScrapEntries] = useState([]);
  const [numScrapEntries, setNumScrapEntries] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const orderId = `Order-${Date.now()}`;

  const scrapTypeMap = {
    "type 1": "Plastic",
    "type 2": "Copper",
    "type 3": "Iron",
    "others": OtherScrapType,
  };

  const scrapQualityMap = {
    "Quality 1": "Good",
    "Quality 2": "Average",
    "Quality 3": "Bad",
  };

  useEffect(() => {
    localStorage.removeItem('orderData');
  }, []);

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); 
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (scrapEntries.length === 0) {
      setError("Please add at least one scrap entry.");
      return;
    }

    setError("");

    const orderData = {
      orderId,
      entries: scrapEntries.map(entry => ({
        ...entry,
        address: adminPhone[0]?.address || "",
        phoneno: adminPhone[0]?.phoneno || "",
        username: adminPhone[0]?.username || "",
      })),
      totalAmount: subtotal,
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate("/Completeorder", { state: { orderData } });
  };

  const handleAddScrap = () => {
    if (!scrapType || !scrapQuality || !weight || !amount) {
      setError("All fields are required to add a scrap entry.");
      return;
    }

    const weightValue = parseInt(weight, 10);
    const amountValue = parseInt(amount, 10);

    if (isNaN(weightValue) || weightValue <= 0) {
      setError("Weight must be a positive integer.");
      return;
    }

    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Amount must be a positive integer.");
      return;
    }

    const newEntry = {
      scrapType: scrapType === "others" ? OtherScrapType : scrapType,
      scrapQuality,
      weight: weightValue,
      amount: amountValue,
    };

    setScrapEntries([...scrapEntries, newEntry]);
    setNumScrapEntries(prevCount => prevCount + 1);
    setSubtotal(prevSubtotal => prevSubtotal + newEntry.amount);

    setScrapType("");
    setOtherScrapType("");
    setScrapQuality("");
    setWeight("");
    setAmount("");
    setError("");
  };

  const handleDeleteScrap = (index) => {
    const updatedEntries = scrapEntries.filter((_, i) => i !== index);
    const removedAmount = scrapEntries[index]?.amount || 0;

    setScrapEntries(updatedEntries);
    setNumScrapEntries(prevCount => prevCount - 1);
    setSubtotal(prevSubtotal => prevSubtotal - removedAmount);
  };

  const handleScrapTypeChange = (e) => {
    const value = e.target.value;
    setScrapType(value);
    if (value !== "others") {
      setOtherScrapType("");
    }
    setError(""); 
  };

  const handleScrapQualityChange = (e) => {
    setScrapQuality(e.target.value);
    setError(""); 
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setWeight(value);
    }
    setError("");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
    setError(""); 
  };

  const handleOtherScrapTypeChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setOtherScrapType(value);
      setError("");
    } else {
      setError("Other Scrap Type can only contain letters.");
    }
  };

  return (
    <>
      <Headerdealer />
      <div className="topbottom mt-5">
      <div className="">
      <h2>Ongoing Order Details</h2>
      <div className="dealer-container row">
            <div className="dealer-info col-12 col-lg-8 col-md-12 col-sm-12">
            {adminPhone.map((item, index) => (
            <div key={index}>
               <h5>Dealer Information</h5>
              <p><strong>Name:</strong>{item.username}</p>
              <p><strong>Phone Number:</strong>{item.address}</p>
              <p><strong>Location:</strong>{item.phoneno}</p>
            </div>
          ))}
            </div>
            <div className="otp-display col-12 col-lg-4 col-md-12 col-sm-12">
              <div className="otp-box">
                <p>Your OTP is:</p>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength="1"
                    style={{
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      margin: "0 5px",
                    }}
                  />
                ))}
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
          <div className="dealer-container row">
          <span className="scrapdetail-label">Scrap Type:</span>
          <select
            style={{ height: "40px" }}
            value={scrapType}
            onChange={handleScrapTypeChange}
          >
            <option value="">Select Scrap Type</option>
            <option value="type 1">Plastic</option>
            <option value="type 2">Copper</option>
            <option value="type 3">Iron</option>
            <option value="others">Others</option>
          </select>

          {scrapType === "others" && (
            <>
              <span className="scrapdetail-label">Other Scrap Type:</span>
              <input
                style={{ height: "40px" }}
                value={OtherScrapType}
                onChange={handleOtherScrapTypeChange}
              />
            </>
          )}

          <span className="scrapdetail-label">Scrap Quality:</span>
          <select
            style={{ height: "40px" }}
            value={scrapQuality}
            onChange={handleScrapQualityChange}
          >
            <option value="">Select Scrap Quality</option>
            <option value="Quality 1">Good</option>
            <option value="Quality 2">Average</option>
            <option value="Quality 3">Bad</option>
          </select>

          <span className="scrapdetail-label">Weight:</span>
          <input
            style={{ height: "40px" }}
            value={weight}
            onChange={handleWeightChange}
          />

          <span className="scrapdetail-label">Amount:</span>
          <input
            style={{ height: "40px" }}
            value={amount}
            onChange={handleAmountChange}
          />

          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

          <button className="ongoing-addscrap-btn mt-4" onClick={handleAddScrap}>Add Scrap</button>
          {scrapEntries.length > 0 && (
            <div>
              {scrapEntries.map((entry, index) => (
                <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", position: "relative" }}>
                   <p><strong>Scrap Type:</strong> {scrapTypeMap[entry.scrapType] || entry.scrapType}</p>
                  <p><strong>Scrap Quality:</strong> {scrapQualityMap[entry.scrapQuality] || entry.scrapQuality}</p>
                  <p><strong>Weight:</strong> {entry.weight}Kg</p>
                  <p><strong>Amount:</strong> ₹{entry.amount}</p>
                  <button
                    onClick={() => handleDeleteScrap(index)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "none",
                      fontSize: "25px",
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}

              <div style={{ marginTop: "20px" }}>
                <p><strong>Total Scrap Entries:</strong> {numScrapEntries}</p>
                <p><strong>Subtotal Amount:</strong> ₹{subtotal.toFixed(2)}</p>
              </div>
            </div>
          )}
                <div className="fixed-footer">
            <div className="ongoing-addscrap-btn" onClick={handleSubmit}>SUBMIT</div>
            <div className="ongoing-modal-cls-btn" onClick={() => navigate("/Homedealer")}>CANCEL</div>
          </div>
          </div>
      </div>
      </div>
    </>
  );
}

export default Scrapdetail;
