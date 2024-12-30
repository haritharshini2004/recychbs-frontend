// import React from 'react';
// import Notification from './Notification';
// import Demo from './Demo';

// const Trail = () => {
//   const notifications = [
//     { head: "dealer 1", title: "comment", message: "your order" },
//     { head: "dealer 2", title: "comment", message: "your order" },
//     { head: "dealer 3", title: "comment", message: "your order" },
//   ];

//   return (
//     <div>
//       <Demo notificationCount={notifications.length} />
//       <Notification />
//     </div>
//   );
// };

// export default Trail;
import React, { useState } from "react";
import logo from "../assets/image/logotrans.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "../component/Alert";

const Login = () => {
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLogin, setActiveLogin] = useState("USER");
  const [formData, setFormData] = useState({
    user: { email: "", password: "" },
    dealer: { email: "", password: "" }
  });
  const [errors, setErrors] = useState({
    user: { email: "", password: "" },
    dealer: { email: "", password: "" }
  });
  const [error, setError] = useState("");
  const [isUserPasswordVisible, setIsUserPasswordVisible] = useState(false);
  const [isDealerPasswordVisible, setIsDealerPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (email.trim() === "") {
      return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email is invalid.";
    }
    return "";
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

  const validatePassword = (password) => {
    if (password === "") {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password should be at least 8 characters.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [role, field] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value
      }
    }));
    setErrors((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: "",
      },
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const [role, field] = name.split(".");
    let newErrors = { ...errors };

    if (field === "email") {
      newErrors[role].email = validateEmail(value);
    }
    if (field === "password") {
      newErrors[role].password = validatePassword(value);
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = getCookie('csrftoken');

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
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

    const dataToSend = {
      ...formData,
      loginType: activeLogin
    };
    setLoading(true);
    fetch('https://recychbs-7f558d40e2a6.herokuapp.com/login-form/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          setError('');
          displayAlert('success', 'Logged In successfully');

          // Store login details in session storage
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userRole', activeLogin);
          sessionStorage.setItem('formSubmitted', JSON.stringify(data.form_submitted));
          sessionStorage.setItem('applicationStatus', JSON.stringify(data.application_status));

          // Fast navigation after displaying alert
          setTimeout(() => {
            if (activeLogin === "USER") {
              navigate("/Homeuser");
            } else if (activeLogin === "DEALER") {
              if (data.application_status === "approved") {
                navigate("/Homedealer");
              } else if (data.form_submitted === 'True') {
                navigate("/Applicationstatus");
              } else {
                navigate("/Dealerdetails");
              }
            }
          }, 100); // Short 100ms delay to ensure alert is shown briefly
        });
      } else {
        return response.json().then(data => {
          setError(data.error);
          displayAlert('error', 'Log In Failed');
        });
      }
    })
    .catch(error => {
      console.log("Error:", error);
    })
    .finally(() => {
      setLoading(false); // Set loading to false when API call is complete
    });

    const role = activeLogin.toLowerCase();
    const currentErrors = { ...errors };
    
    currentErrors[role].email = validateEmail(formData[role].email);
    currentErrors[role].password = validatePassword(formData[role].password);
  
    setErrors(currentErrors);
  
    const hasErrors = Object.values(currentErrors[role]).some((error) => error);
    if (hasErrors) {
      return;
    }
  };

  const handleToggleUserPasswordVisibility = () => {
    setIsUserPasswordVisible(!isUserPasswordVisible);
  };

  const handleToggleDealerPasswordVisibility = () => {
    setIsDealerPasswordVisible(!isDealerPasswordVisible);
  };

  return (
    <div className='admin-login'>
        <div className='logotop'>
        <img src={logo} className='logo'/>
        <h6>RECYCHBS</h6>
      </div>
         <div className="login-center">
         <div className="login-right">
            <div style={{ display: "flex",width:"100%",justifyContent:"space-between",padding:"0 20px" }}>
              <div
                onClick={() => setActiveLogin("USER")}
                style={{
                  cursor: "pointer",
                  marginRight: "50px",
                  fontWeight: activeLogin === "USER" ? "bold" : "600",
                  fontSize: "20px",
                  color: activeLogin === "USER" ? "#fff" : "#adbcc6"
                }}
              >
                <p>User Login</p>
              </div>
              <div
                onClick={() => setActiveLogin("DEALER")}
                style={{
                  cursor: "pointer",
                  fontWeight: activeLogin === "DEALER" ? "bold" : "600",
                  fontSize: "20px",
                  color: activeLogin === "DEALER" ? "#fff" : "#adbcc6"
                }}
              >
                <p>Dealer Login</p>
              </div>
            </div>
            {activeLogin === "USER" && (
              <div className="login-box foruser">
                <h2 className="login-heading">USER LOGIN</h2>
                <form onSubmit={handleSubmit}>
                  <label className="login-label">
                    Email:
                    <input
                      type="text"
                      name="user.email"
                      value={formData.user.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="login-input"
                      style={{ borderColor: errors.user.email ? "red" : "" }}
                      autoComplete="off"
                    />
                    {errors.user.email && (
                      <div className="error-text">{errors.user.email}</div>
                    )}
                  </label>
                  <label className="login-label">
                    Password:
                    <div style={{ position: "relative" }}>
                      <input
                        type={isUserPasswordVisible ? "text" : "password"}
                        name="user.password"
                        value={formData.user.password}
                        onChange={handleChange}
                        className="login-input"
                        style={{ borderColor: errors.user.password ? "red" : "" }}
                        autoComplete="off"
                      />
                      <div
                        className="password-icon"
                        onClick={handleToggleUserPasswordVisibility}
                        style={{ position: "absolute", right: "10px", top: "-25px", transform: "translateY(-50%)", cursor: "pointer" }}
                      >
                        {isUserPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    {errors.user.password && (
                      <div className="error-text">{errors.user.password}</div>
                    )}
                  </label>
                  <a
                    href="/password-reset"
                    style={{ textDecoration: "none" }}
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    type="submit"
                    style={{ textDecoration: "none" }}
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </form>
              </div>
            )}
            {activeLogin === "DEALER" && (
              <div className="login-box fordealer">
                <h2 className="login-heading">DEALER LOGIN</h2>
                <form onSubmit={handleSubmit}>
                  <label className="login-label">
                    Email:
                    <input
                      type="text"
                      name="dealer.email"
                      value={formData.dealer.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="login-input"
                      style={{ borderColor: errors.dealer.email ? "red" : "" }}
                      autoComplete="off"
                    />
                    {errors.dealer.email && (
                      <div className="error-text">{errors.dealer.email}</div>
                    )}
                  </label>
                  <label className="login-label">
                    Password:
                    <div style={{ position: "relative" }}>
                      <input
                        type={isDealerPasswordVisible ? "text" : "password"}
                        name="dealer.password"
                        value={formData.dealer.password}
                        onChange={handleChange}
                        className="login-input"
                        style={{ borderColor: errors.dealer.password ? "red" : "" }}
                        autoComplete="off"
                      />
                      <div
                        className="password-icon"
                        onClick={handleToggleDealerPasswordVisibility}
                        style={{ position: "absolute", right: "10px", top: "-25px", transform: "translateY(-50%)", cursor: "pointer" }}
                      >
                        {isDealerPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    {errors.dealer.password && (
                      <div className="error-text">{errors.dealer.password}</div>
                    )}
                  </label>
                  <a
                    href="/password-reset"
                    style={{ textDecoration: "none" }}
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    type="submit"
                    style={{ textDecoration: "none" }}
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      <Alert show={showAlert} type={alertType} message={alertMessage} handleClose={handleClose} />
    </div>
  );
};

export default Login;
