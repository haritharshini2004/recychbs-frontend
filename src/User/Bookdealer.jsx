import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimesCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import { MdOutlineTimer } from 'react-icons/md';

const Bookdealer = () => {
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState({ hour: '12', minute: '00', period: 'AM' });
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateChange = (date) => {
    if (date) {
      setSelectDate(date);
    }
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setSelectTime(prev => ({ ...prev, [name]: value }));
  };

  const togglePeriod = () => {
    setSelectTime(prev => ({ ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' }));
  };

  const navigate = useNavigate();

  const validateAddress = (address) => {
    const addressPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/;
    return addressPattern.test(address);
  };

  const handleSubmit = () => {
    if (!address || !selectDate || !selectTime.hour || !selectTime.minute) {
      setErrorMessage('Please fill in address details.');
      return;
    } else if (!validateAddress(address)) {
      setErrorMessage('Address must include door number, street, village and pin code.');
      return;
    }

    const answer = {
      selectDate,
      selectTime: `${selectTime.hour}:${selectTime.minute} ${selectTime.period}`,
      address,
    };

    const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
          const cookies = document.cookie.split(";");
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith(`${name}=`)) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    };

    const csrfToken = getCookie("csrftoken");

    fetch('https://recychbs-7f558d40e2a6.herokuapp.com/bookdealer/', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(answer),
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      },
    })
   
    .then(data => {
      setErrorMessage(data.message);
      navigate("/Successful");
    })
    .catch(error => {
      setErrorMessage('Failed to send message: ' + error.message);
      console.error('Error:', error);
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <div style={{ display: "flex", padding: "20px", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: "30px", fontWeight: "800", color: "#000" }}>Confirm Details</span>
          </div>

          <div>
            <span style={{ fontSize: "25px", fontWeight: "800", color: "#000" }}>Address</span>
            <textarea
              style={{ width: "100%", height: "100px", fontSize: '17px' }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Door No, Street, Village, City, Pincode"
            />
          </div>

          <div className="row" style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* Date Picker */}
            <div className="col-6 mt-4 d-flex flex-column">
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#000", marginBottom: "10px" }}>Select Date</span>
              <div className={`datepicker-container ${selectDate ? 'selected' : ''}`} style={{ position: 'relative' }}>
                <DatePicker
                  selected={selectDate}
                  onChange={handleDateChange}
                  minDate={new Date()} // Prevent past dates
                  dateFormat="dd/MM/yyyy"
                  className="form__input"
                  placeholderText="Select date"
                />
                <FaCalendarAlt style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '20px' }} />
                {selectDate && (
                  <FaTimesCircle
                    onClick={() => setSelectDate(null)}
                    style={{ position: 'absolute', right: '40px', top: '10px', fontSize: '20px', cursor: 'pointer', color: 'red' }}
                  />
                )}
              </div>
            </div>

            {/* Time Picker */}
            <div className="col-6 mt-4 d-flex flex-column">
              <span style={{ fontSize: "20px", fontWeight: "800", color: "#000", marginBottom: "10px" }}>Select Time</span>
              <div className="clock-picker" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <select
                  name="hour"
                  value={selectTime.hour}
                  onChange={handleTimeChange}
                  style={{ fontSize: '20px', marginRight: '5px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px', flex: '1' }}
                >
                  {[...Array(12).keys()].map(i => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <span style={{ fontSize: '20px', marginRight: '5px' }}>:</span>
                <select
                  name="minute"
                  value={selectTime.minute}
                  onChange={handleTimeChange}
                  style={{ fontSize: '20px', marginRight: '5px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px', flex: '1' }}
                >
                  {[0, 15, 30, 45].map(i => (
                    <option key={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>
                  ))}
                </select>
                <button onClick={togglePeriod} style={{ fontSize: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                  {selectTime.period}
                </button>
                <MdOutlineTimer style={{ marginLeft: '10px', fontSize: '25px' }} />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <div className="submit-button" onClick={handleSubmit}>
            Book Dealer
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookdealer;