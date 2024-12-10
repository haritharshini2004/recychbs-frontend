import React, { useState } from 'react';
import logo from '../assets/image/logotrans.png'; 
import { useParams, useNavigate, Link } from 'react-router-dom';

const PasswordResetConfirm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

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

    try {
      const response = await fetch(`https://recychbs-backend.onrender.com/reset/${uid}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setMessage('Password reset successful.');
        navigate('/login');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('Failed to reset password.');
    }
  };

  return (
    <div className="container-fluid p-0 m-0" style={{ height: "100vh" }}>
      <div className="login-container d-flex" style={{ height: "100%" }}>
        <div className="col-lg-6 col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="login-left text-center" style={{backgroundColor:"transparent"}}>
            <img src={logo} className="logonew" alt="Logo" />
            <span className="logonew-text">RECYCHBS</span>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="forgot-password-form p-4" style={{ width: "100%" }}>
            <h2 style={{ fontWeight: "800" }}>Set New Password</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <div className="form-group">
              <label
                htmlFor="password"
                style={{ fontSize: "20px", fontWeight: "600", marginTop: "20px" }}
              >
                New Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                style={{ fontSize: "20px", fontWeight: "600", marginTop: "20px" }}
              >
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your new password"
              />
            </div>
            <button type="submit" className="mt-4 py-1 px-2" style={{ backgroundColor: "lightblue", borderWidth: "0" }}>
              Reset Password
             
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
