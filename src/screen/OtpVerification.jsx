import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/logotrans.png";
import { FaCheck } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import Alert from "../component/Alert";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isPromptActive, setIsPromptActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
   const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [sAlert, setShowAlert] = useState(false);

  const showAlert = () => {
    setIsPromptActive(true);
    const userConfirmed = window.confirm("Do you really want to quit the registration?");
    setIsPromptActive(false);
    return userConfirmed;
  };

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      if (!isPromptActive) {
        if (showAlert()) {
          navigate('/'); // Go back to the previous page
        } else {
          window.history.pushState(null, null, window.location.href); // Stay on the current page
        }
      }
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handlePopState);

    if (isTimerActive) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isTimerActive, isPromptActive, navigate]);

  useEffect(() => {
    const otpSession = sessionStorage.getItem('otpSession');
    if (location.state?.from === '/Register1') {
      if (otpSession === 'completed') {
        navigate('/'); // or navigate to any other page you want
      } else {
        sessionStorage.setItem('otpSession', 'active');
        setIsTimerActive(true);
      }
    } 
    // if (location.state?.from !== '/Register1') {
    //   // navigate('/'); // or navigate to any other page you want
    // }
    return () => {
      sessionStorage.removeItem('otpSession');
    };
  }, [location, navigate]);

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

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

  const csrfToken = getCookie("csrftoken");

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleClick = (e) => {
    e.preventDefault();
    setTimer(30);
    setIsTimerActive(true);
    fetch("http://127.0.0.1:8000/resend-otp/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Otp Button Clicked");
    setLoading(true);
    fetch("http://127.0.0.1:8000/otp/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enteredOtp }),
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.setItem('otpSession', 'completed');
          displayAlert('success', 'Registered successfully');
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        } else {
          return response.json().then((data) => {
            setOtpError(data.otp_error);
            console.log("The error is", data.otp_error);
            navigate("/OtpVerification");
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when API call is complete
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      <img
        src={logo}
        style={{
          height: "140px",
          width: "170px",
          marginBottom: "50px",
        }}
        alt="Logo"
      />
      <h2>OTP Verification</h2>
      <h6>Please Enter the OTP to complete the registration</h6>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChangeOtp(e.target, index)}
            onFocus={(e) => e.target.select()}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              margin: "0 2px",
            }}
          />
        ))}
      </div>
      
      <p style={{ color: "red" }}>{otpError}</p>
      <div
        onClick={handleOtpSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            padding: "5px 15px",
            color: "#fff",
            borderRadius: "5px",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Verify OTP"}
        </div>
      </div>
      <p style={{ marginTop: "10px", fontWeight: 'bold' }}>
        {isTimerActive ? `Resend OTP in ${timer} seconds` : "You can resend OTP now."}
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      
        <label onClick={handleClick} 
          disabled={isTimerActive} 
          style={{
            padding: "5px 10px",
            cursor: isTimerActive ? "not-allowed" : "pointer",
            color: isTimerActive ? '#777' : '#007BFF',
            border: 'none',
            borderRadius: '4px',
            fontSize:'17px',
            fontWeight:'bolder'
          }}
          >Resend OTP</label>
      </div>
      {sAlert && (
        <Alert type={alertType} message={alertMessage} onClose={handleClose} />
      )}
    </div>
  );
};

export default OtpVerification;
