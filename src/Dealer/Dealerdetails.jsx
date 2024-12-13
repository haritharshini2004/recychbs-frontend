import React, { useState, useRef } from "react";
import { FiUploadCloud, FiCheckCircle } from "react-icons/fi"; // Combine imports from the same package
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProgressBar, Step } from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css";
import Headerdealer from "../component/Headerdealer";
import Bottomdealer from "../component/Bottomdealer";
import './Dealerdetails.css';
import Alert from "../component/Alert";

const Dealerdetails = () => {
  
  
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    mailId: "",
    dateOfBirth: null,
    aadharNumber: "",
    panCardNumber: "",
    licenseNumber: "",
    vehicleNumber: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    nationality: "India",
    bankAccountNumber: "",
    ifscCode: "",
    bankAccountName: "",
  });
  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    aadharfront: "",
    aadharback: "",
    panCard: "",
    licensefront: "",
    licenseback: "",
    vehicle: "",
    statement: "",
    passbook: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Vehicle Type");
  const [options] = useState(["2 wheeler", "3 wheeler", "4 wheeler"]);
  const fileInputRefs = {
    aadharfront: useRef(null),
    aadharback: useRef(null),
    panCard: useRef(null),
    licensefront: useRef(null),
    licenseback: useRef(null),
    vehicle: useRef(null),
    statement: useRef(null),
    passbook: useRef(null)
  };

  // const [base_fileNames, base_setFileNames] = useState([]);  // To store selected file names
  // const [base_files, base_setFiles] = useState([]);  // To store base64 strings of files


  const [filesData, setFilesData] = useState({});  // To store base64 data for each file

console.log(filesData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
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
  
  // Function to validate input based on the field name
  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        return /^[a-zA-Z\s.'-]+$/.test(value);
      case "bankAccountName":
        return /^[a-zA-Z\s.'-]+$/.test(value);
      case "phoneNumber":
        return /^\d{10}$/.test(value);
      case "aadharNumber":
        return /^\d{12}$/.test(value);
      case "panCardNumber":
        return /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
      case "bankAccountNumber":
        return /^\d+$/.test(value);
      case "city":
      case "state":
      case "nationality":
        return /^[a-zA-Z\s]+$/.test(value);
      case "postcode":
        return /^\d{6}$/.test(value);
      case "mailId":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "licenseNumber":
        return /^[A-Z]{2}\d{14}$/.test(value);
      case "vehicleNumber":
        return /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(value);
      case "ifscCode":
        return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);
      case "address":
        return /^([0-9]+[\/-]?[0-9]*[A-Za-z]?[\s,-]+)?([a-zA-Z\s]+[\s,-]+)?([a-zA-Z\s]+)$/.test(value);
      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
  
    if (value.trim() === "") {
      errorMessage = ""; // Clear errors if input is empty
    } else {
      // Validation logic
      if (name === "dateOfBirth") {
        const date = new Date(value);
        if (isNaN(date.getTime()) || date > new Date()) {
          errorMessage = "Date of Birth cannot be in the future";
        }
      } else if (name === "name" && !/^[a-zA-Z\s.'-]+$/.test(value)) {
        errorMessage = "Invalid name";
      } else if (name === "address" && !/^([0-9]+[\/-]?[0-9]*[A-Za-z]?[\s,-]+)?([a-zA-Z\s]+[\s,-]+)?([a-zA-Z\s]+)$/.test(value)) {
        errorMessage = "Invalid address format. Please include a door number, street name, and village";
      }else if (name === "bankAccountName" && !/^[a-zA-Z\s.'-]+$/.test(value)) {
        errorMessage = "Invalid name";
      }else if (name === "phoneNumber") {
        if (!/^\d{10}$/.test(value)) {
          errorMessage = "Phone number must be exactly 10 digits";
        }
      } else if (name === "aadharNumber") {
        if (!/^\d{12}$/.test(value)) {
          errorMessage = "Aadhar number must be exactly 12 digits";
        }
      } else if (name === "panCardNumber") {
        if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value)) {
          errorMessage = "PAN card number must be exactly 10 characters";
        }
      } else if (name === "bankAccountNumber" && !/^\d+$/.test(value)) {
        errorMessage = "Bank account number must contain only digits";
      } else if (
        name === "city" ||
        name === "state" ||
        name === "nationality"
      ) {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} can only contain letters and spaces`;
        }
      } else if (name === "postcode") {
        if (!/^\d{6}$/.test(value)) {
          errorMessage = "Postcode must be exactly 6 digits";
        }
      } else if (name === "mailId") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
      } else if (name === "licenseNumber") {
        if (!/^[A-Z]{2}\d{14}$/.test(value)) {
          errorMessage = "Driving License must be 16 digits & uppercase letters";
        }
      } else if (name === "vehicleNumber") {
        if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(value)) {
          errorMessage = "Vehicle number must be in the format: XX00XX0000";
        }
      } else if (name === "ifscCode") {
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
          errorMessage = "IFSC code must be uppercase letters / 11 Alphanumeric characters.";
        }
      }
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  

  const handleDateChange = (date) => {
    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 18)); 

    if (date && date > minDate) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            dateOfBirth: "You must be at least 18 years old",
        }));
        return;
    }

    // Clear error if date is valid
    setErrors((prevErrors) => ({
        ...prevErrors,
        dateOfBirth: "",
    }));

    // Set the date if valid
    setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: date,
    }));
};


const handleFileChange = (fileType) => (e) => {
  const file = e.target.files[0];
  const validFormats = [
    'image/jpeg', 
    'image/png', 
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  setFileNames((prevFileNames) => ({
    ...prevFileNames,
    [fileType]: file ? file : null,
  }));

  // Clear the error for the specific file type
  if (file) {
    if (!validFormats.includes(file.type)) {
      // Set an error message if the file type is invalid
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fileType]: 'Invalid file format. Please upload JPG, PNG, PDF, or DOC.',
      }));
      return;
    } else {
      // Clear the error if the file format is valid
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fileType]: "", // Clear error message for the specific file type
      }));
    }
  } else {
    // Optional: Handle the case where no file is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fileType]: "No file selected.",
    }));
  }

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setFilesData(prevData => ({
        ...prevData,
        [fileType]: { base64: base64String, file_name: file.name }  // Update the base64 and name for this field
      }));
    };

    reader.readAsDataURL(file);  // Convert file to base64
  }
};


  const handleIconClick = (fileType) => {
    fileInputRefs[fileType].current.click();
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      vehicleType: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentStep === 1) {
        if (!formData.name || !/^[a-zA-Z\s.'-]+$/.test(formData.name))
          newErrors.name = "Valid Name is required";
        // if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
        //   newErrors.phoneNumber = "Valid phone number is required";
        // if (!formData.mailId) newErrors.mailId = "Mail ID is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of Birth is required";
        if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber))
          newErrors.aadharNumber = "Valid Aadhar Number is required";
        if (
          !formData.panCardNumber ||
          !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panCardNumber)
        ) {
          newErrors.panCardNumber = "Valid PAN Card Number is required";
        }
        if (!fileNames.aadharfront) newErrors.aadharfront = "Aadhar Front Image is required";
        if (!fileNames.aadharback) newErrors.aadharback = "Aadhar Back Image is required";
        if (!fileNames.panCard) newErrors.panCard = "PAN Card Image is required";
  } else if (currentStep === 2) {
        if (
          !formData.bankAccountNumber ||
          !/^\d+$/.test(formData.bankAccountNumber)
        )
          newErrors.bankAccountNumber = "Valid Bank Account Number is required";
        if (
          !formData.ifscCode ||
          !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)
        ) {
          newErrors.ifscCode = "IFSC Code must be uppercase letters";
        }
        if (!formData.bankAccountName)
          newErrors.bankAccountName = "Bank Account Name is required";
        if (!formData.bankAccountName || !/^[a-zA-Z\s.'-]+$/.test(formData.bankAccountName))
          newErrors.bankAccountName = "Valid Name is required";
        if (!fileNames.statement)
          newErrors.statement = "Bank Statement is required";
        if (!fileNames.passbook)
          newErrors.passbook = "Bank Passbook Image is required";

  } else if (currentStep === 3) {
  

        if (
          !formData.licenseNumber ||
          !/^[A-Z]{2}\d{14}$/.test(formData.licenseNumber)
        )
          newErrors.licenseNumber = "Valid Driving License Number is required";
        if (
          !formData.vehicleNumber ||
          !/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(formData.vehicleNumber)
        )
          newErrors.vehicleNumber = "Valid Vehicle Number is required";
        if (selectedOption === "Select Vehicle Type")
          newErrors.vehicleType = "Vehicle Type must be selected";
        if (!fileNames.licensefront)
          newErrors.licensefront = "Driving License Front Image is required";
        if (!fileNames.licenseback)
          newErrors.licenseback = "Driving License Back Image is required";
        if (!fileNames.vehicle) newErrors.vehicle = "RC Book Image is required";

  } else if (currentStep === 4) {

        if (!formData.address || !/^([0-9]+[\/-]?[0-9]*[A-Za-z]?[\s,-]+)?([a-zA-Z\s]+[\s,-]+)?([a-zA-Z\s]+)$/.test(formData.address))
           newErrors.address = "Address is required with door no, street, village";
        if (!formData.city || !/^[a-zA-Z\s]+$/.test(formData.city))
          newErrors.city = "Valid city is required";
        if (!formData.state || !/^[a-zA-Z\s]+$/.test(formData.state))
          newErrors.state = "Valid state is required";
        if (!formData.postcode || !/^\d{6}$/.test(formData.postcode))
          newErrors.postcode = "Valid Postcode is required";
        if (!formData.nationality || !/^[a-zA-Z\s]+$/.test(formData.nationality))
          newErrors.nationality = "Valid nationality is required";
    
  }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    const uploadFile = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      uploadFile.append(key, value);
    }

    for (const [key, file] of Object.entries(fileNames)) {
      if (file) {
        uploadFile.append(key, file);
      }
    }

    uploadFile.append("vehicleType", selectedOption);
    // Append filesData (base64-encoded file data)
for (const [key, fileData] of Object.entries(filesData)) {
  if (fileData) {
    uploadFile.append(`${key}_base64`, fileData.base64);  // Add base64 string
    uploadFile.append(`${key}_fileName`, fileData.file_name);  // Add file name for each file
  }
}


    const csrfToken = getCookie("csrftoken");
    displayAlert('loading', 'Uploading, please wait...');

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

    try {
      // Send the form data to the server
      const response = await fetch(
        "http://127.0.0.1:8000/dealer_details/",
        // "http://127.0.0.1:8000/dealer_details/",
        {
          method: "POST",
          body: uploadFile,
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        console.log("Submited");
        // alert("Dealer Details submitted successfully");
        // onClose();
        displayAlert('success', 'Dealer Details submitted successfully');
        // Navigate to the application status page on successful response
        // navigate("/Applicationstatus");
        setTimeout(() => {
          navigate("/Applicationstatus");
        }, 2000);
      } else {
        const data = await response.json();
        console.log("Not Submited");
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Reset loading state after the submission completes
    }
  };

  const handleNextStep = () => {
    const validationErrors = validateForm(formData, currentStep);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const isNextDisabled = Object.keys(validateForm(formData)).length > 0;

  const isFormValid = () => {
    if (currentStep === 1) {
      return (
        formData.name &&
        formData.dateOfBirth &&
        formData.phoneNumber &&
        formData.mailId &&
        formData.aadharNumber &&
        formData.panCardNumber &&
        fileNames.aadharfront &&
        fileNames.aadharback &&// Ensure file is selected
        fileNames.panCard   // Ensure file is selected
      );
    } else if (currentStep === 2) {
      return (
        formData.bankAccountNumber &&
        formData.ifscCode &&
        formData.bankAccountName &&
        formData.statement &&
        formData.passbook
      );
    } else if (currentStep === 3) {
      return (
        formData.licenseNumber &&
        formData.vehicleNumber &&
        fileNames.licensefront && // Ensure file is selected
        fileNames.licenseback && 
        fileNames.vehicle    // Ensure file is selected
      );
    } else if (currentStep === 4) {
      return (
        formData.address &&
        formData.city &&
        formData.state &&
        formData.postcode &&
        formData.nationality
      );
    }
    return false; // Default case
  };

  const CustomInput = React.forwardRef(({ value, onClick, error }, ref) => (
    <input
        type="text"
        className={`datepicker-input ${error ? "error" : ""}`} // Apply error class if error is true
        onClick={onClick}
        value={value}
        ref={ref}
        readOnly // Prevent manual input
    />
));

const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "Personal Details";
    case 2:
      return "Bank Details";
    case 3:
      return "Dealer Vehicle Details";
    case 4:
      return "Working Details";
    default:
      return "";
  }
};

  return (
    <>
      <div className="container-fluid-ts" style={{ width: "100%" }}>
      <div className="agentdetails" id="agentdetails">
          <h2 className="text-center" style={{ fontWeight: "700" }}>
            DEALER DETAILS
          </h2>
          <span style={{ fontWeight: "600", marginTop: "20px" }}>
            ENTER THE FOLLOWING DETAILS TO CREATE AN DEALER ACCOUNT
          </span>

          <div>
      <ProgressBar
        percent={(currentStep / 4) * 100}
        filledBackground="linear-gradient(to right, #a8e063, #56ab2f)"
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Step key={index} transition="scale">
            {({ accomplished }) => (
              <div className={`indexedStep ${currentStep === index + 1 ? "active" : accomplished ? "accomplished" : ""}`}>
                {index + 1}
                <div className="RSPBprogressBarText">{getStepTitle(index + 1)}</div>
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
    </div>

          {currentStep === 1 && (
            <div>
              <div>
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Name <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={`inputfield ${errors.name ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.name}</p>
          </div>
 
          <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Date of Birth <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
          <div className="datepicker-container">
              <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className={`form__input ${errors.dateOfBirth ? "error" : ""}`} // Keep this for the main class
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  dropdownMode="select"
                  customInput={<CustomInput error={errors.dateOfBirth} />} // Pass error prop
              />
              <FaCalendarAlt className="calendar_icon" />
          </div>


        <p className="error-warning">{errors.dateOfBirth}</p>


          {/* <div className="phonemail">
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              onBlur={handleBlur}
                required
                className={`inputfield ${errors.phoneNumber ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.phoneNumber}</p>
            </div>
            <div className="col-12 col-lg-6 col-sm-12">
              <label className="HeadText">Mail ID:</label>
              <input
                type="text"
                name="mailId"
                value={formData.mailId}
                onChange={handleInputChange}
              onBlur={handleBlur}
                required
                className={`inputfield ${errors.mailId ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.mailId}</p>
            </div>
          </div> */}
 
          <div className="phonemail">
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Aadhar Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="0000-0000-0000"
                required
                className={`inputfield ps-2 ${
                  errors.aadharNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.aadharNumber}</p>
 
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Aadhar Front Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.aadharfront ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.aadharfront}
                  style={{ display: "none" }}
                  onChange={handleFileChange("aadharfront")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("aadharfront")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {fileNames.aadharfront ? (
                    <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.aadharfront ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.aadharfront ? fileNames.aadharfront.name : "No file selected"}
              </p>
              <p className="error-warning">{errors.aadharfront}</p>

              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Aadhar Back Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.aadharback ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.aadharback}
                  style={{ display: "none" }}
                  onChange={handleFileChange("aadharback")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("aadharback")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {fileNames.aadharback ? (
                    <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.aadharback ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.aadharback ? fileNames.aadharback.name : "No file selected"}
              </p>
              <p className="error-warning">{errors.aadharback}</p>
            </div>
 
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>PAN Card Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="panCardNumber"
                value={formData.panCardNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="XXXXX0000X"
                required
                className={`inputfield ps-2 ${
                  errors.panCardNumber ? "error" : ""
                }`}
              />
              <p className="error-warning">{errors.panCardNumber}</p>
 
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>PAN Card Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.panCard ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.panCard}
                  style={{ display: "none" }}
                  onChange={handleFileChange("panCard")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("panCard")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.panCard ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.panCard ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.panCard
                  ? fileNames.panCard.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.panCard}</p>
            </div>
          </div>

              <div onClick={handleNextStep} className="submit-button1">
                Next
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
               <div>
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Bank Account Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={`inputfield ${
                errors.bankAccountNumber ? "error" : ""
              }`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.bankAccountNumber}</p>
          </div>
 
          <div>
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>IFSC Code <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              placeholder="XXXX0YYYYYY"
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={`inputfield ${errors.ifscCode ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.ifscCode}</p>
          </div>
 
          <div>
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>
              User Name ( As on Bank Passbook) <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p>
            </label>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              className={`inputfield ${errors.bankAccountName ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.bankAccountName}</p>
          </div>

          <div className="phonemail">
          <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Bank Statement <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.statement ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.statement}
                  style={{ display: "none" }}
                  onChange={handleFileChange("statement")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("statement")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.statement ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.statement ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.statement
                  ? fileNames.statement.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.statement}</p>
            </div>

            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>PassBook Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.passbook ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.passbook}
                  style={{ display: "none" }}
                  onChange={handleFileChange("passbook")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("passbook")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.passbook ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.passbook ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.passbook
                  ? fileNames.passbook.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.passbook}</p>
            </div>
          </div>

              <div onClick={handleNextStep} className="submit-button1">
                Next
              </div>
              <div onClick={handlePrevStep} className="submit-button1">
                Previous
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="phonemail">
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Driving License Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="XX00000000000000"
                required
                className={`inputfield ps-2 ${
                  errors.licenseNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.licenseNumber}</p>
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>License Front Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.licensefront ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.licensefront}
                  style={{ display: "none" }}
                  onChange={handleFileChange("licensefront")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("licensefront")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.licensefront ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.licensefront ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.licensefront
                  ? fileNames.licensefront.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.licensefront}</p>

              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>License Back Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div  className={`uploaddiv ps-2 ${
                errors.licenseback ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.licenseback}
                  style={{ display: "none" }}
                  onChange={handleFileChange("licenseback")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("licenseback")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.licenseback ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.licenseback ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.licenseback
                  ? fileNames.licenseback.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.licenseback}</p>
            </div>
 
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Vehicle Number <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="XX00XX0000"
                required
                className={`inputfield ps-2 ${
                  errors.vehicleNumber ? "error" : ""
                }`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.vehicleNumber}</p>
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>RC Book Image <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div className={`uploaddiv ps-2 ${
                errors.vehicle ? "error" : ""
              }`}>
                <input
                  type="file"
                  ref={fileInputRefs.vehicle}
                  style={{ display: "none" }}
                  onChange={handleFileChange("vehicle")}
                  accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" 
                />
                <div
                  onClick={() => handleIconClick("vehicle")}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {fileNames.vehicle ? (
                <>
                <FiCheckCircle className="uploadicon" style={{ color: 'green' }} /> 
                <a style={{ fontSize: "14px"}}>Click here for Re-upload</a>
                </>
              ) : (
                <>
                <FiUploadCloud className="uploadicon" />
                <a style={{ fontSize: "14px"}}>Upload</a>
                </>
              )}
                </div>
              </div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX
              </p>
              <p style={{ fontSize: "15px", marginTop: "10px",  color: fileNames.vehicle ? "green" : "black"}}>
                Selected file:{" "}
                {fileNames.vehicle
                  ? fileNames.vehicle.name
                  : "No file selected"}
              </p>
              <p className="error-warning">{errors.vehicle}</p>
            </div>
            </div>
            <div>
          <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Vehicle Type <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <div
              className={`custom-dropdown ps-2 ${
                errors.vehicleType ? "error" : ""
              }`}>
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                  {selectedOption}
                  {isOpen ? (
                    <FaChevronUp className="dropdown-arrow" />
                  ) : (
                    <FaChevronDown className="dropdown-arrow" />
                  )}
                </div>
                {isOpen && (
                  <div className="dropdown-options">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="dropdown-option"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                </div>
                <p className="error-warning">{errors.vehicleType}</p>
              </div>
              

          <div onClick={handleNextStep} className="submit-button1">
                Next
              </div>
              <div onClick={handlePrevStep} className="submit-button1">
                Previous
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <div>
            <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}> Working Address <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Door No , Street , Village"
              onBlur={handleBlur}
              required
              className={`inputfield ${errors.address ? "error" : ""}`}
              autoComplete="off"
            />
            <p className="error-warning">{errors.address}</p>
          </div>
          <div className="phonemail">
          <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Nationality <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality || "India"} 
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`inputfield ${errors.nationality ? "error" : ""}`}
                autoComplete="off"
              />
              
              <p className="error-warning">{errors.nationality}</p>
            </div>

            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>State <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`inputfield ${errors.state ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.state}</p>
            </div>
          </div>

          <div className="phonemail">
          <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>City <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`inputfield ${errors.city ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.city}</p>
            </div>
 
 
            <div className="col-12 col-lg-6 col-sm-12 phonemail-gap">
              <label className="HeadText" style={{ display: 'flex', alignItems: 'center' }}>Post / PinCode <p style={{ color: 'red', margin: 0, paddingLeft: '4px' }}>*</p></label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`inputfield ${errors.postcode ? "error" : ""}`}
                autoComplete="off"
              />
              <p className="error-warning">{errors.postcode}</p>
            </div>
 
           
          </div>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
              <div onClick={handleSubmit} className="submit-button1">
                Submit
              </div>
              <div onClick={handlePrevStep} className="submit-button1">
                Previous
              </div>
            </div>
          )}
        </div>
        {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={handleClose} />
      )}
      </div>
    </>
  );
};

export default Dealerdetails;