import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaSnapchatGhost, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
 
const Footer = () => {
  return (
    <div
      className="container-fluid"
      style={{ width: "100%", backgroundColor: "gray" }}
    >
      <div className="row footerpage">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
              <h6 className="footer-heading">Get To Know Us</h6>
            <Link to="/Aboutus" className="footer-subtext-link">
              <span className="footer-subtext">About us</span>
           </Link>
            <Link to="/Career" className="footer-subtext-link">
              <span className="footer-subtext">Careers</span>
           </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
            <h6 className="footer-heading">Connect With Us</h6>
            <div className="d-flex flex-row" style={{marginBottom:"20px"}}>
            <a href="https://www.instagram.com/recychbs/" target="_blank" rel="noopener noreferrer">
              <div
                className="avar"
                data-tooltip="Instagram"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
              >
                <BsInstagram style={{ color: "black" }} />
              </div>
              </a>
              <a href="pfbid02GWnhzp3Pf9JV1cJ5hchqEgyZ9Mbjhn1Ge9D2XqrdZi5LRi8Do6bhyEC4wacam9mvl" target="_blank" rel="noopener noreferrer"></a>
              <div
                className="avar"
                data-tooltip="Facebook"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
              >
                <FaFacebookF style={{ color: "black" }} />
              </div>
              <a href="https://x.com/RECYCHBS?mx=2" target="_blank" rel="noopener noreferrer">
              <div
                className="avar"
                data-tooltip="Twitter"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
              >
                <FaXTwitter style={{ color: "black" }} />
              </div>
              </a>
              <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGTfvGuthIkaQAAAZKZClB4dOInvDPKMt8RbltUsiItqYAb-xUHFL1r6Juc59rqWKsA0wXOpHwKnLZsSCeJYewkl0dVQEf3IbZdObPgySmvLmdipIeDbGVXpo3Ip-PVb6c5tXY=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Frecycyle-by-hudsmer-business-solutions-a28b93330%2F" target="_blank" rel="noopener noreferrer">
              <div
                className="avar"
                data-tooltip="LinkedIn"
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  cursor:"pointer"
                }}
              >
                <FaLinkedinIn style={{ color: "black" }} />
              </div>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">
            <h6 className="footer-heading">Make Money With Us</h6>
            <Link to="/Sellon" className="footer-subtext-link">
              <span className="footer-subtext">Sell on RECYCHBS</span>
           </Link>
            <Link to="/Fulfillment" className="footer-subtext-link">
              <span className="footer-subtext">Fulfilment by RECYCHBS</span>
           </Link>
            <Link to="/Becomedealer" className="footer-subtext-link">
              <span className="footer-subtext">
                Become an Dealer with RECYCHBS
              </span>
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="d-flex flex-column">          
              <h6 className="footer-heading">Let Us Help You</h6>
            <Link to="/Useraccount" className="footer-subtext-link">
              <span className="footer-subtext">Your Account</span>
           </Link>
            <Link to="/BookingProtection" className="footer-subtext-link">
              <span className="footer-subtext">100% Booking Protection</span>
           </Link>
            <Link to="/" className="footer-subtext-link">
              <span className="footer-subtext">RECYCHBS App Download</span>
           </Link>
            <Link to="/Userhelp" className="footer-subtext-link">
              <span className="footer-subtext">Help</span>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;