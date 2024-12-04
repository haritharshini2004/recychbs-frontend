import logo from "../assets/image/logotrans.png";

const Datadel = ()=>{
    return(
        <>
           <div
        className="container-fluid"
        style={{
          maxHeight:'100%',
          minHeight:'100vh',
          backgroundColor: "#000",
          color: "#fff",
          // paddingTop: "20px",
          fontSize: "20px",
          fontWeight: "200",
               paddingLeft:"30px",
          paddingRight:"30px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ height: "180px", width: "200px" }} />
        </div>
        <div style={{ marginTop: "50px" }}>
          <span>
         <p style={{display:'flex',justifyContent:'center',alignItems:'center',color:'orange'}}> Data Deletion Request</p>
<p >We respect your privacy and are committed to protecting your personal information. </p>
<p>If you wish to request the deletion of your data stored on our servers, please follow the instructions below.</p>

<p style={{color:'orange'}}>1.How to Request Data Deletion</p>
To request the deletion of your personal data, please send an email to <a className="text-decoration-none" href="mailto:recycbs.in@gmail.com">recycbs.in@gmail.com</a>. In your email, include the following information:

<p style={{marginLeft:'70px'}}>Your full name</p>
<p style={{marginLeft:'70px'}}>The email address associated with your account</p>
<p style={{marginLeft:'70px'}}>A brief description of your request</p>
<p style={{color:'orange'}}>2.What Happens Next?</p>
<p style={{ marginLeft: "20px" }}>Once we receive your request, we will process it in accordance with our data protection policies. You will receive a confirmation email once your request has been processed. Please allow us up to [X business days] to complete the deletion process.</p>

<p style={{color:'orange'}}>Important Information</p>
<p  style={{ marginLeft: "20px" }}>Deleting your data may result in the loss of access to certain services and features.</p>
<p  style={{ marginLeft: "20px" }}>We may retain some information as required by law or for legitimate business purposes.</p>
<p  style={{ marginLeft: "20px" }}>If you have any questions or need further assistance, feel free to reach out to us.</p>

<p style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Thank you for your understanding!</p>
          </span>
        </div>
      </div>
        </>
    )
}

export default Datadel