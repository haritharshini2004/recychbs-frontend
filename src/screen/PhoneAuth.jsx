import React, { useState } from "react";
import { auth } from "./firebaseConfig"; // Ensure this path is correct
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import logo from "../assets/image/logotrans.png"; // Include your logo
import Alert from "../component/Alert"; // Assuming you have an Alert component

const PhoneAuth = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [sAlert, setShowAlert] = useState(false);

    // Initialize ReCAPTCHA
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: () => console.log("Captcha verified"),
            },
            auth
        );
    };

    // Send OTP to the user's phone number
    const sendOtp = () => {
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = `+91${phone}`;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setOtpSent(true);
                displayAlert("success","OTP sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                displayAlert("error","Error sending OTP. Please try again.");
            });
    };

    // Verify OTP entered by the user
    const verifyOtp = () => {
        const confirmationResult = window.confirmationResult;
        setLoading(true);
        confirmationResult
            .confirm(otp)
            .then((result) => {
                const user = result.user;
                displayAlert("success","Phone number verified successfully!");
                // Send user info to your backend
                fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone: user.phoneNumber,
                        uid: user.uid,
                    }),
                });
            })
            .catch((error) => {
                console.error("Error verifying OTP:", error);
                displayAlert("error","Invalid OTP. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
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

    return (
        <div style={styles.container}>
            <img src={logo} style={styles.logo} alt="Logo" />
            <h2 style={styles.header}>Phone Authentication</h2>
            <h6 style={styles.subHeader}>Please Enter Your Phone Number</h6>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
            />
            {otpSent && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={verifyOtp} style={styles.button} disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </>
            )}
            {!otpSent && (
                <button onClick={sendOtp} style={styles.button} disabled={loading}>
                    {loading ? "Sending..." : "Send OTP"}
                </button>
            )}
            {sAlert && (
                <Alert type={alertType} message={alertMessage} onClose={handleClose} />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
        backgroundColor: "#f9f9f9",
    },
    logo: {
        height: "140px",
        width: "170px",
        marginBottom: "50px",
    },
    header: {
        marginBottom: "20px",
        color: "#333",
    },
    subHeader: {
        marginBottom: "20px",
        color: "#666",
    },
    input: {
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default PhoneAuth;