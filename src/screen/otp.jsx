// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/image/logotrans.png";
// import { FaCheck } from "react-icons/fa";
 
// const OtpVerification = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [otpError, setOtpError] = useState("");
//   const [showToast, setShowToast] = useState(false);
//   const [animate, setAnimate] = useState(false);
//   const navigate = useNavigate();
//   const csrfToken = getCookie("csrftoken");
 
//   function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== "") {
//       const cookies = document.cookie.split(";");
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === `${name}=`) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   }
 
//   const handleChangeOtp = (element, index) => {
//     if (isNaN(element.value)) return;
//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
 
//     // Focus on the next input
//     if (element.nextSibling && element.value) {
//       element.nextSibling.focus();
//     }
//   };
 
//   const handleOtpSubmit = (e) => {
//     setShowToast(true);
//     setTimeout(() => {
//       setAnimate(true);
//       setTimeout(() => {
//         navigate("/Login");
//       }, 1000);
//     }, 500);
//     e.preventDefault();
//     const enteredOtp = otp.join("");
 
//     fetch("https://recychbs-7f558d40e2a6.herokuapp.com/otp/", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "X-CSRFToken": csrfToken,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ enteredOtp }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           setShowToast(true);
//           setTimeout(() => {
//             setAnimate(true);
//             setTimeout(() => {
//               navigate("/Login");
//             }, 1000);
//           }, 500);
//         } else {
//           return response.json().then((data) => {
//             setOtpError(data.otp_error);
//             navigate("/Otp");
//           });
//         }
//       })
//       .catch((error) => {
//         console.log("Error:", error);
//       });
//   };
 
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//         position: "relative",
//       }}
//     >
//       <img
//         src={logo}
//         style={{
//           height: "140px",
//           width: "170px",
//           marginBottom: "50px",
//         }}
//         alt="Logo"
//       />
//       <h2>OTP Verification</h2>
//       <h6>Please Enter the OTP in order to complete the registration</h6>
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           marginTop: "20px",
//         }}
//       >
//         {otp.map((data, index) => (
//           <input
//             key={index}
//             type="text"
//             maxLength="1"
//             value={data}
//             onChange={(e) => handleChangeOtp(e.target, index)}
//             onFocus={(e) => e.target.select()}
//             style={{
//               width: "40px",
//               height: "40px",
//               textAlign: "center",
//               fontSize: "16px",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               margin: "0 2px",
//             }}
//           />
//         ))}
//       </div>
//       <p style={{ color: "red" }}>{otpError}</p>
//       <div
//         onClick={handleOtpSubmit}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "30px",
//           cursor: "pointer",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "green",
//             padding: "5px 15px",
//             color: "#fff",
//             borderRadius: "5px",
//           }}
//         >
//           Verify OTP
//         </div>
//       </div>
 
//       {showToast && (
//         <div
//           className={`toast-box ${animate ? "animate-border" : ""}`}
//           style={{ position: "absolute", top: "20px", right: "20px" }}
//         >
//           <FaCheck className="toast-icon" />
//           <h3 className="toast-content">Registered Successfully!</h3>
//         </div>
//       )}
 
//       <div
//         style={{
//           position: "absolute",
//           bottom: "120px",
//           width: "100%",
//           textAlign: "end",
//           cursor: "pointer",
//           paddingRight: "80px",
//         }}
//       >
//         <p style={{ color: "green",fontWeight:"700" }}>Resend OTP</p>
//       </div>
//     </div>
//   );
// };
 
// export default OtpVerification;