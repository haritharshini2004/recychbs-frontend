import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineUpload, AiOutlineHourglass } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from '../assets/image/logotrans.png';
import Alert from "../component/Alert";
import { BiErrorCircle } from 'react-icons/bi'; // Example of another icon

const Applicationstatus = () => {
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState('waiting');
  const [require, requirestatus] = useState('');
  const [showRequirementMessage, setShowRequirementMessage] = useState(true);
  const [showExtraDataInput, setShowExtraDataInput] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   

  // const toggleStatus = () => {
  //   setStatus((prevStatus) => {
  //     switch (prevStatus) {
  //       case 'waiting':
  //         return 'approved';
  //       case 'approved':
  //         return 'extradata';
  //       case 'extradata':
  //         return 'waiting';
  //       default:
  //         return 'waiting';
  //     }
  //   });
  // };

  useEffect(() => {
    setShowExtraDataInput(status === 'extradata');
  }, [status]);

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

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    if (event.target.files.length > 0) {
      setError('');
    }
  };

 
  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };
  const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
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
  const navigate = useNavigate();

   
    useEffect(() => {
          // Fetch status from Django when the component loads
          const fetchStatus = async () => {
            try {
              const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/FetchStatusActive/',{
            // const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/FetchStatusActive/ ', {
              credentials: 'include', // Ensures cookies are sent
              'X-CSRFToken':csrfToken
              }); // Django API endpoint
              const data = await response.json();
              setStatus(data[0].application_status); // Set the status based on the fetched value
              requirestatus(data[0].requirements);
                  if (data[0].application_status === "approved"){
                    // navigate('/Homedealer');
                    sessionStorage.setItem('applicationStatus $$$$', JSON.stringify(data.application_status)); 
                    displayAlert('success', 'Your Profile is approved');
                    setTimeout(() => {
                      navigate("/Homedealer");
                    }, 2000);    
                  }
                  else if (data[0].application_status === "rejected"){
                    displayAlert('error', 'Your Profile is rejected');
                  }
              console.log(data[0].application_status);
              console.log(data[0].requirements);
              console.log(data[0].Dealer_ID);
              (data.status);
            } catch (error) {
              console.error('Error fetching status:', error);
              
            }
          };
          fetchStatus();
        }, []);

const handleSubmit = async () => {
  // Clear previous error message
  setError('');

  // Validate input
  if (files.length === 0 && message.trim() === '') {
    setError('Please upload a file or enter a message.'); // Set error message
    return; // Prevent submission
  }
  setShowRequirementMessage(false);
  setStatus('waiting');
  displayAlert('success', 'Data Uploaded');

  const uploadFile = new FormData();
  files.forEach((file, index) => {
    uploadFile.append(`file${index}`, file);
  });
  uploadFile.append('message', message);

  try {
    const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/send_extraData/', {
      method: 'POST',
      body: uploadFile,
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Response is OK");
    } else {
      const data = await response.json();
      console.log("Response is not OK");
      setError(data.error);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }

  setFiles([]);
  setMessage('');
};

  return (
    <>
      <div className="container-fluid application-container">
      <div className="application-header">
          <img src={logo} alt="Logo" />
          <span style={{ fontSize: "25px", fontWeight: "700", color: "#fff" }}>
            RECYCHBS
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "25px", fontWeight: "700", color: "#fff" }}>
            Application Status
          </span>
        </div>
        <div className="application-layer">
          <div className="d-flex align-items-center">
            <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "lightgreen" }} />
            <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
              Your Details Submitted Successfully
            </p>
          </div>
          <div className="line-vertical"></div>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            // onClick={toggleStatus}
          >
            {status === 'approved' ? (
              <>
                <AiOutlineCheckCircle style={{ height: "30px", width: "30px", color: "lightgreen" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Approved
                </p>
              </>
            ) : status === 'extradata' ? (
              <>
                <BiErrorCircle style={{ height: "30px", width: "30px", color: "darkblue" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Need Extra Data
                </p>
              </>
            ) : status === 'rejected' ? (
              <>
                <AiOutlineCloseCircle style={{ height: "30px", width: "30px", color: "red" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Rejected
                </p>
              </>
            ) : (
              <>
                <AiOutlineHourglass style={{ height: "30px", width: "30px", color: "yellow" }} />
                <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }} className="pt-3">
                  Waiting for Response...
                </p>
              </>
            )}
          </div>
          

          {showExtraDataInput && (
           <div
           style={{
             display: "flex",
             justifyContent: "center",
             flexDirection: "column",
             marginLeft: "30px",
           }}
         >
           <div style={{ padding: "10px", borderRadius: "10px" }}>
           {showRequirementMessage && (
  <p style={{ marginLeft: "10px", fontSize: "18px", fontWeight: "700" }}>{require}</p>
)}
             <p style={{ color: "white", fontSize: "18px" }}>
             Please Upload the Information and Data mentioned above
             </p>
             <div>
             <input
                type="text"
                placeholder="Dealer can message here"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError(""); 
                }}
                style={{
                  width: "100%",
                  border: "1px solid #e277f3",
                  outline: "none",
                  backgroundColor: "transparent",
                  height: "40px",
                  color: "white", 
                  "::placeholder": {
                    color: "white"
                  }
                }}
                onFocus={(e) => (e.target.style.border = "2px solid #e277f3")}
                onBlur={(e) => (e.target.style.border = "1px solid #e277f3")}
              />
             </div>
             <div
               style={{
                 display: "flex",
                 borderRadius: "5px",
                 border: "1px dotted #fff",
                 padding: "10px",
                 marginTop: "20px",
                 alignItems: "center",
                 position: "relative",
               }}
             >
               <input
                 type="file"
                 id="file-upload"
                 multiple
                 onChange={handleFileChange}
                 style={{
                   position: "absolute",
                   width: "100%",
                   height: "100%",
                   opacity: 0,
                   cursor: "pointer",
                 }}
               />
               <label
                 htmlFor="file-upload"
                 style={{
                   width: "100%",
                   height: "100%",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center",
                   color: "#fff",
                   cursor: "pointer",
                   paddingTop: "30px",
                   paddingBottom: "30px",
                   flexDirection:"column"
                 }}
               >
                 <AiOutlineUpload style={{ marginRight: "10px", color: "#e277f3",width:"30px",height:"30px" }} />
                 Choose Your Data
               </label>
             </div>
             <div style={{ marginTop: "20px" }}>
               {files.length > 0 && (
                 <ul>
                   {files.map((file, index) => (
                     <li key={index}>
                       {file.name}
                       <button
                         onClick={() => handleRemoveFile(file.name)}
  className="application-button"
                       >
                         Remove
                       </button>
                     </li>
                   ))}
                 </ul>
               )}
             </div>
             {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
             <div className="d-flex justify-content-center mt-5">
               <button className="application-button" onClick={handleSubmit}>
                 SUBMIT
               </button>
             </div>
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

export default Applicationstatus;