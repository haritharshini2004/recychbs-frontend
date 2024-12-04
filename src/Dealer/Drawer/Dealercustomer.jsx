function Dealercustomer() {
  return(
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
              <div style={{ marginTop: "70px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold" }}>Customer Service</span>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                  
                  <span>Welcome to our Customer Service page! We’re here to help you with any questions or concerns you may have regarding our scrap collection service. Please find the relevant sections below for quick assistance:
                  </span>                     
              </div>
              
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>1. Contact Us </div>
                  <span>
                 <p> *Support Email: [support@example.com]</p>
                  <p> *Phone Number: [123-456-7890]</p>
                 <p>*Business Hours: [Monday to Friday, 9 AM to 6 PM (Your Time Zone)]</p>
                  </span>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                 
                  <span>
                  Feel free to reach out to us through email or phone for any assistance. We aim to respond to all inquiries within [X] business hours.</span>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>2. Submit a Request </div>
                  <span>
                    <p>Request Form: [Link to an online form where users can submit detailed requests, complaints, or feedback.]</p>
                      </span>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                 <span>Please provide as much detail as possible so we can assist you effectively.               </span>
              </div>
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>Common Issues </div>
                  <span>
                    <p>
                    Trouble with Booking: [Brief description of common booking issues and their solutions.]
                    </p>
                    <p>Payment Problems: [Common payment-related issues and troubleshooting steps.] </p>
                    <p>Collection Issues: [Information on what to do if there’s a problem with the scrap collection.]</p>
                  </span>

              </div>
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>4. Feedback </div>
                  <span>
                    <p>
                    Submit Feedback: [Link to a feedback form or survey where users can provide their thoughts on the service.]
                    </p>
                    </span>
                    <span>
                    We value your feedback and use it to improve our services.
                    </span>

              </div>
          </div>
      </>
  );
};

export default Dealercustomer;
