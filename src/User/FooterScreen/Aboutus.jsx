import logo from "../../assets/image/logotrans.png";
import Header from "../../component/Header";
import group from "../../assets/image/friendly.webp";
import scrapcar from "../../assets/image/scrap-car.jpg";
import hands from "../../assets/image/hands.webp";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Aboutus = () => {
  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user mx-0 px-0" style={{backgroundColor:"#fff"}}>
        <div className="aboutus-header">
          {/* <img src={logo} style={{ height: "200px", width: "250px" }} /> */}
          <span></span>
          <span>ABOUT US</span>
        </div>
        <div className="container-fluid m-0 pt-0 aboutus-layout">
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card">
                <img
                  src={group}
                  className="Responsiveimg"
                  alt="Responsive Image"
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card">
                <span>
                  Welcome to RECYCHBS, where sustainability meets innovation. We
                  are a forward-thinking startup dedicated to revolutionizing
                  the way scrap materials are collected and recycled. Founded
                  with a vision to reduce environmental impact and promote
                  responsible waste management, RECYCHBS offers a seamless
                  platform connecting individuals and businesses with local
                  scrap dealers for efficient recycling.
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12 d-lg-none p-0">
              <div className="aboutus-card">
                <img
                  src={scrapcar}
                  className="Responsiveimg"
                  alt="Responsive Image"
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card">
                <span>
                  Our mission is to prevent valuable resources from ending up in
                  landfills by making recycling accessible, convenient, and
                  rewarding. We empower college students as dealers, providing
                  them with opportunities to earn while contributing to a
                  greener planet. By leveraging advanced technology, including
                  real-time data integration and automated pricing based on
                  market trends, we ensure transparency and fairness in every
                  transaction.
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 d-none d-lg-block p-0">
              <div className="aboutus-card">
                <img
                  src={scrapcar}
                  className="Responsiveimg"
                  alt="Responsive Image"
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card">
                <img
                  src={hands}
                  className="Responsiveimg"
                  alt="Responsive Image"
                  style={{ borderRadius: "30px" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card flex-column">
                <span>
                  At RECYCHBS, we believe that small actions lead to big
                  changes. Join us in creating a cleaner, more sustainable
                  future—one scrap at a time.
                </span>
                <div className="d-flex flex-row" style={{ margin: "20px 0" }}>
                  <a
                    href="https://www.instagram.com/recychbs/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                        cursor: "pointer",
                      }}
                    >
                      <BsInstagram className="aboutus-icon" />
                    </div>
                  </a>
                  <a
                    href="pfbid02GWnhzp3Pf9JV1cJ5hchqEgyZ9Mbjhn1Ge9D2XqrdZi5LRi8Do6bhyEC4wacam9mvl"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></a>
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
                      cursor: "pointer",
                    }}
                  >
                    <FaFacebookF className="aboutus-icon" />
                  </div>
                  <a
                    href="https://x.com/RECYCHBS?mx=2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                        cursor: "pointer",
                      }}
                    >
                      <FaXTwitter className="aboutus-icon" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGTfvGuthIkaQAAAZKZClB4dOInvDPKMt8RbltUsiItqYAb-xUHFL1r6Juc59rqWKsA0wXOpHwKnLZsSCeJYewkl0dVQEf3IbZdObPgySmvLmdipIeDbGVXpo3Ip-PVb6c5tXY=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Frecycyle-by-hudsmer-business-solutions-a28b93330%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                        cursor: "pointer",
                      }}
                    >
                      <FaLinkedinIn className="aboutus-icon" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Aboutus;
