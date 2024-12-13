import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/image/logotrans.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Alert from "../component/Alert";
const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};
 
const Register1 = () => {
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    street: "",
    city: "",
    state: "",
    country: "IN",
    pincode: "",
    role: "DEALER",
    terms: false,
  });
 
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedState, setSelectedState] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [touched, setTouched] = useState({
    contact: false,
    email: false,
  });
 
  const navig = useNavigate();
 
  useEffect(() => {
    fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        // Automatically fetch states for India once countries are loaded
        fetchStates("IN");
      })
      .catch(error => console.error('Error loading countries:', error));
  }, []);

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

  const fetchStates = (countryCode) => {
    setLoadingStates(true);
    fetch(`${config.cUrl}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then(response => response.json())
      .then(data => {
        const sortedStates = data.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        setLoadingStates(false);
        setCities([]); // Clear cities when changing country
      })
      .catch(error => console.error('Error loading states:', error));
  };

  useEffect(() => {
    const otpSession = sessionStorage.getItem('otpSession');
    if (otpSession === 'completed') {
      sessionStorage.removeItem('otpSession');
    }
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      fetch(`${config.cUrl}/${selectedCountry}/states/${selectedState}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })
        .then(response => response.json())
        .then(data => {
          const sortedCities = data.sort((a, b) => a.name.localeCompare(b.name));
        setCities(sortedCities);
          setLoadingCities(false);
        })
        .catch(error => console.error('Error loading cities:', error));
    } else {
      setCities([]);
    }
  }, [selectedState]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Clear error message if the input is empty or in the correct format
    if (value.trim() === "" || validateInput(name, value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

  // Update form data
  setFormData((prevData) => ({
    ...prevData,
    [name]: type === "checkbox" ? checked : value,
  }));

  // Validate input and set error messages
  const errorMessage = validateInput(name, type === "checkbox" ? checked : value);

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage || '', // Clear error message if valid
  }));
  };
  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        return /^[a-zA-Z\s.'-]+$/.test(value)
      case "contact":
        return /^\d{10}$/.test(value)
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      
      case "password":
        return value.length >= 8
        
      case "confirmPassword":
        return value === formData.password
        
      case "pincode":
        return /^\d{6}$/.test(value)
        
      case "address":
        return /^[\d\s/(),]+$/.test(value)
        
      case "street":
        return /^[\w\s,./()\-]+$/.test(value)
        
      case "city":
      case "state":
      case "nationality":
        return /^[a-zA-Z\s]+$/.test(value)
        
      case "country":
        return value.trim() !== ""
        
      case "postcode":
        return /^\d{6}$/.test(value)
  
      case "mailId":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  
      case "licenseNumber":
        return /^[A-Z]{2}\d{14}$/.test(value)
  
      case "vehicleNumber":
        return /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(value)
  
      case "ifscCode":
        return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)
  
      default:
        return null; // No validation for unknown fields
    }
  }
  const handleBlur = (e) => {
    const { name } = e.target;
  
    const newErrors = { ...errors };
  
    // Combined validation for all fields
    if (formData.name!="" && !/^[a-zA-Z\s.'-]+$/.test(formData.name)) {
      newErrors.name = "Valid name is required";
    }
  
    if (formData.contact!="" && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Valid phone number is required";
    }
  
    if (formData.email!="" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (formData.pincode!="" && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Valid pincode is required";
    }
  
    if (formData.password!="" && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
  
    if (formData.confirmPassword!="" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    // Update errors state
    setErrors(newErrors);
  
    // Update touched state
    // setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  
  
  
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.name || !/^[a-zA-Z\s.'-]+$/.test(formData.name)) newErrors.name = "Valid name is required";
  if (!formData.contact || !/^\d{10}$/.test(formData.contact))
    newErrors.contact = "Valid phone number is required";
  if (!formData.email) newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    newErrors.email = "Invalid email format";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.street) newErrors.street = "Street is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Valid pincode is required";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (!formData.password)
      newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
 
    return newErrors;
  };
 
 
  const handleSubmit = (e) => {
    const updatedErrors = { ...errors };
    if (formData.country) updatedErrors.country = "";
    if (formData.state) updatedErrors.state = "";
    setErrors(updatedErrors);
  
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (!captchaValue) {
        setError("Please complete the reCAPTCHA.");
        return;
      }
      setLoading(true);
      localStorage.removeItem("formData");
  
      console.log(formData);
      const csrfToken = getCookie("csrftoken");
      console.log("csrftoken: ",csrfToken)
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
   
      fetch("http://127.0.0.1:8000/register-form/", {
     
        credentials: 'include', 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            setMessage(data.message);
           
          console.log("the fetch data-",data);
          // alert("Registered Successfully");
          navig('/OtpVerification', { state: { from: '/Register1' } });     
          // displayAlert('success', 'Registered Successfully');
          // setTimeout(() => {
          //   navig("/OtpVerification");
          // }, 2000);    
         });
        } else {
          return response.json().then(data => {
            setErrorMessage(data.error);
            setEmailError(data.email_error);
            navig("/Register1");
          console.log("error block is printing");
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when API call is complete
      });
    } else {
     
      setErrors(formErrors);
    }
  };
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setFormData(prevData => ({ ...prevData, country: value }));
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, country: "" }));
      fetchStates(value);
    }
  };
 
  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setFormData(prevData => ({ ...prevData, state: value }));
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, state: "" }));
    }
  };
 
 
 
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
 
  const handleTogglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  return (
    <div
      className="container-fluid m-0 p-0 register-container"
    >
      <div className="camp">
        <div className="loginpage">
          <div className="formbox">
            <div className="imgtop">
              <img src={logo} style={{ width: "85px", height: "70px" }} />
            </div>
            <h2 style={{ fontWeight: "600", fontSize: "24px" }}> Dealer Register</h2>
            <p style={{ fontWeight: "500", fontSize: "15px" }} className="p-0">
              Get access to RecycHBS by creating an account
            </p>
 
            <div>
            <label className="HeadText m-0" style={{ display: 'flex', alignItems: 'center' }}>
              Name
              <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p>
            </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="inputfield"
                autoComplete="off"
                style={{ borderColor: errors.name ? "red" : "" }}
              />
              <p className="error-warning">{errors.name}</p>
             
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Contact Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
<input
  type="text"
  name="contact"
  value={formData.contact}
  onChange={handleChange}
  onBlur={handleBlur}
  required
  className="inputfield"
  autoComplete="off"
  style={{ borderColor: errors.contact ? "red" : "" }}
/>
<p className="error-warning">{errors.contact}</p>


<label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Email Address <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  onBlur={handleBlur}
  required
  className="inputfield"
  autoComplete="off"
  style={{ borderColor: errors.email ? "red" : "" }}
/>
<p className="error-warning">{errors.email}</p>

 
              <div className="input-box">
                <div className="input-wrapper">
                  <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Password <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="inputfield"
                    autoComplete="off"
                    style={{ borderColor: errors.password ? "red" : "" }}
                  />
                  <div
                    className="password-icon"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  <p className="error-warning">{errors.password}</p>
                </div>
 
                <div className="input-wrapper">
                  <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Confirm Password <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
                  <input
                    type={isPasswordVisible1 ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="inputfield"
                    autoComplete="off"
                    style={{ borderColor: errors.confirmPassword ? "red" : "" }}
                  />
                  <div
                    className="password-icon"
                    onClick={handleTogglePasswordVisibility1}
                  >
                    {isPasswordVisible1 ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  <p className="error-warning">{errors.confirmPassword}</p>
                </div>
              </div>
 
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Door No <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="inputfield"
                autoComplete="off"
                style={{ borderColor: errors.address ? "red" : "" }}
              />
              <p className="error-warning">{errors.address}</p>
             
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Street <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="inputfield"
                autoComplete="off"
                style={{ borderColor: errors.street ? "red" : "" }}
              />
              <p className="error-warning">{errors.street}</p>
 
              <div className="input-box">
              <div className="input-wrapper">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Country <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <select
  value={formData.Country}
  onChange={handleCountryChange}
  className="inputfield"
>
  <option value="IN">India</option>
  {countries.map(country => (
    <option key={country.iso2} value={country.iso2}>
      {country.name}
    </option>
  ))}
</select>
            <p className="error-warning">{errors.country}</p>
</div>
<div className="input-wrapper">
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>State <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
            <select
  value={formData.State}
  onChange={handleStateChange}
  onBlur={handleBlur}
  disabled={!selectedCountry || loadingStates}
  className="inputfield"
  style={{ borderColor: errors.address ? "red" : "" }}
>
  <option value="">Select State</option>
  {states.map(state => (
    <option key={state.iso2} value={state.iso2}>
      {state.name}
    </option>
  ))}
</select>
            <p className="error-warning">{errors.state}</p>
            </div>
            </div>
            <div className="input-box">
            <div className="input-wrapper">
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>City <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
    <select
      name="city"
      value={formData.city}
      onChange={(e) => handleChange(e)}
      onBlur={handleBlur}
      disabled={!selectedState || loadingCities}
      className="inputfield"
      style={{ borderColor: errors.address ? "red" : "" }}
    >
      <option value="">Select City</option>
      {cities.map(city => (
        <option key={city.iso2} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
    <p className="error-warning">{errors.city}</p>
            </div>
            <div className="input-wrapper">
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Pincode <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="inputfield"
                autoComplete="off"
                style={{ borderColor: errors.pincode ? "red" : "" }}
              />
              <p className="error-warning">{errors.pincode}</p>
              </div>
              </div>
     
 
              <input type="hidden" name="role" value={formData.role} />
              <ReCAPTCHA
                sitekey="6Lfv4zQqAAAAAKAqWKH0hazJhWnjHmpH8WYMoiNp"
                onChange={(value) => setCaptchaValue(value)}
                className="mt-4"
              />
             
              <div className="terms mt-4">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label
                  htmlFor="terms"
                  style={{
                    fontSize: "12px",
                    marginLeft: "8px",
                    textAlign: "center",
                  }}
                >
                  I agree to the{" "}
                  <Link to="/DealerTerm" className="text-decoration-none" target="_blank" style={{fontSize:'15px', fontWeight:'bold',color:"#bf0bdb"}}>
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {message && <p style={{ color: "green" }}>{message}</p>}
 
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
 
          <button
  onClick={handleSubmit}
  style={{ cursor: "pointer" }}
  className="login-button"
  disabled={loading} // Disable the button when loading is true
>
  {loading ? "Loading..." : "Register"}
</button>
 
              <label
                htmlFor="terms"
                style={{ fontSize: "12px", marginTop: "10px" }}
              >
                Already have an account{" "}
                <Link to="/Login" className="logintxt text-decoration-none" style={{fontSize:'15px ',fontWeight:'bolder',color:"#bf0bdb"}}>
                  LOGIN
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className="imgpage">
          <div className="imgpage-fixed">
            <img src={logo} className="imgpage-img" />
            <span className="imgpage-text">
              Effortlessly turn your scrap into cash—book a dealer, get accurate
              weights, and enjoy secure payments. Simplify recycling with just a
              few taps!
            </span>
          </div>
        </div>
      </div>
        {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={handleClose} />
      )}
    </div>
  );
};
 
export default Register1;