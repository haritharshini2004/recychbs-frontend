import React, { useState } from "react";
import logo from "../assets/image/logotrans.png";
import { Link, useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/password-reset/', {
      // const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/password-reset/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);  // Success message
        console.log(data.message);
        setErrorMessage('');  // Clear any previous errors
      } else {
        setErrorMessage(data.error);  // Error message from the backend
        console.log(data.error);
        setMessage('');
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again later.');
      console.log(err);
      setMessage('');
    }

    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    // Example of an email regex pattern. This can be more sophisticated based on your requirements.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Reset error and success messages
    setError('');
    setSuccess('');

    // Implement the logic to handle password reset (e.g., API call)
    // For now, simulate a successful submission
    setTimeout(() => {
      setSuccess('Password reset link has been sent to your email.');
      // navigate('/Login'); // Navigate to the login page or wherever you want
    }, 1000);
  };

  return (
    <div className="container-fluid p-0 m-0" style={{ height: "100vh" }}>
      <div className="login-container d-flex" style={{ height: "100%" }}>
        <div className="col-lg-6 col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="login-left text-center" style={{backgroundColor:'transparent'}}>
            <img src={logo} className="logonew" alt="Logo" />
            <span className="logonew-text">RECYCHBS</span>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12 d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="forgot-password-form p-4" style={{width:"100%"  }}>
            <h2 style={{ fontWeight: "800" }}>Forgot Password</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="form-group">
              <label
                htmlFor="email"
                style={{ fontSize: "20px", fontWeight: "600", marginTop: "20px" }}
              >
                Email ID:
              </label>
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            {/* Show success or error message */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" className="mt-4 py-1 px-2" style={{backgroundColor:"lightblue",borderWidth:"0"}}>
              Send Reset Link
            </button>
            <p className="mt-3">
              Remembered your password?{" "}
              <Link
                to="/Login"
                style={{ textDecoration: "none", color: "#007bff" }} // Adjust color as needed
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
