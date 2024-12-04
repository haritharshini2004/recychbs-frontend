function DealerTerm() {
    return (
        <>
            <div
                className="container-fluid"
                style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    paddingTop: "20px",
                    fontSize: "17px",
                    fontWeight: "200",
                    paddingLeft: "30px",
                    paddingRight: "30px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>Terms and Conditions</span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>1. Acceptance of Terms </div>
                    <span>
                        By using our app to book scrap collection services, you agree to abide by these Terms and Conditions. If you do not agree, please do not use the app.
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>2. Service Description </div>
                    <span>
                        Our app allows users to book scrap collection services. A registered scrap dealer will come to the specified location to collect scrap materials as requested by the user.
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>3. User Responsibilities </div>
                    <span>
                        <p>Accuracy of Information: Users must provide accurate and complete information regarding the location and type of scrap materials for collection.</p>
                        <p>Access to Location: Users must ensure that the scrap materials are accessible at the specified location and that the location is safe for the scrap dealer to enter.</p>
                        <p>Compliance with Laws: Users must ensure that the scrap materials do not violate any local laws or regulations.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>4. Scrap Collection </div>
                    <span>
                        <p>Service Availability: Scrap collection services are subject to availability and may vary based on location and time.</p>
                        <p>Collection Times: The collection time is an estimate and may be subject to change based on the scrap dealer’s schedule and other factors.</p>
                        <p>Scrap Type: We reserve the right to refuse collection of certain types of materials if they are deemed hazardous or prohibited.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>5. Fees and Payments </div>
                    <span>
                        <p>Charges: Users will be charged as per the rates provided in the app. Charges are subject to change and will be communicated to users before confirmation.</p>
                        <p>Payment Method: Payments can be made through the app using the available payment methods. All transactions are processed securely.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>6. Cancellation and Refunds </div>
                    <span>
                        <p>Cancellation Policy: Users can cancel a booking through the app before the scheduled collection time. Cancellation fees may apply as outlined in the app.</p>
                        <p>Refunds: Refunds, if applicable, will be processed according to our refund policy. Details are available in the app.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>7. Liability </div>
                    <span>
                        <p>Damage: We are not liable for any damage to property or injury resulting from the scrap collection process. Users should ensure that the collection area is safe.</p>
                        <p>Service Issues: We are not liable for any issues arising from the scrap dealer's performance. Any concerns should be reported through the app for resolution.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>8. Privacy and Data Protection </div>
                    <span>
                        <p>Data Collection: We collect and use personal information as described in our Privacy Policy. By using the app, you consent to the collection and use of your data in accordance with our Privacy Policy.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>9. Changes to Terms </div>
                    <span>
                        <p>We reserve the right to modify these Terms and Conditions at any time. Users will be notified of any significant changes through the app or via email.</p>
                    </span>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>10. Contact Information </div>
                    <span>
                        <p>For any questions or concerns regarding these Terms and Conditions, please contact us at [support email/phone number].</p>
                    </span>
                </div>
            </div>
        </>
    );
};

export default DealerTerm;
