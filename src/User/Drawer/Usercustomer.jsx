function Usercustomer() {
  return(
      <>
          <div
              className="container-fluid m-0"
              style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: "17px",
                  fontWeight: "200",
                  paddingTop:"30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  height:"100vh"
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
              <div style={{ marginTop: "20px", display: "flex", alignItems: "center",justifyContent:"center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold" }}>Customer Service</span>
              </div>
             
              <div style={{ marginTop: "20px" }}>
                 
                  <span style={{marginLeft:'20px'}}>Welcome to our Customer Service page! We’re here to help you with any questions or concerns you may have regarding our scrap collection service. Please find the relevant sections below for quick assistance:
                  </span>                    
              </div>
             
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>1. Contact Us </div>
                  <span >
                 <p style={{marginLeft:'20px'}}> *Support Email: [support@example.com]</p>
                  <p style={{marginLeft:'20px'}}> *Phone Number: [123-456-7890]</p>
                 <p style={{marginLeft:'20px'}}>*Business Hours: [Monday to Friday, 9 AM to 6 PM (Your Time Zone)]</p>
                  </span>
              </div>
             
              <div style={{ marginTop: "20px" }}>
                 
                  <span>
                  Feel free to reach out to us through email or phone for any assistance. We aim to respond to all inquiries within [X] business hours.</span>
              </div>
             
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>2. Submit a Request </div>
                  <span>
                    <p style={{marginLeft:'20px'}}>Request Form: [Link to an online form where users can submit detailed requests, complaints, or feedback.]</p>
                      </span>
              </div>
             
              <div style={{ marginTop: "20px" }}>
                 <span style={{marginLeft:'20px'}}>Please provide as much detail as possible so we can assist you effectively.               </span>
              </div>
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>Common Issues </div>
                  <span>
                    <p style={{marginLeft:'20px'}}>
                    Trouble with Booking: [Brief description of common booking issues and their solutions.]
                    </p>
                    <p style={{marginLeft:'20px'}}>Payment Problems: [Common payment-related issues and troubleshooting steps.] </p>
                    <p style={{marginLeft:'20px'}}>Collection Issues: [Information on what to do if there’s a problem with the scrap collection.]</p>
                  </span>

              </div>
              <div style={{ marginTop: "20px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold" }}>4. Feedback </div>
                  <span>
                    <p style={{marginLeft:'20px'}}>
                    Submit Feedback: [Link to a feedback form or survey where users can provide their thoughts on the service.]
                    </p>
                    </span>
                    <span style={{marginLeft:'20px'}}>
                    We value your feedback and use it to improve our services.
                    </span>

              </div>
          </div>
      </>
  );
};

export default Usercustomer;