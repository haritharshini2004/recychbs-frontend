import logo from "../../assets/image/logotrans.png";
import Header from "../../component/Header";
import group from "../../assets/image/friendly.webp";
import scrapcar from "../../assets/image/scrap-car.jpg";
import hands from "../../assets/image/hands.webp";

const Career = () => {
  return (
    <>
      <Header />
      <div
        className="container-fluid topbottom-user mx-0 px-0"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="aboutus-header">
          {/* <img src={logo} style={{ height: "200px", width: "250px" }} /> */}
          <span></span>
          <span>CAREER</span>
        </div>
        <div className="container-fluid m-0 career-box">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="d-flex justify-content-center align-items-center">
              <img
                  src={group}
                  className="Responsiveimg"
                  alt="Responsive Image"
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
              <div className="p-4">
              <label>Join RECYCHBS and Make a Difference!</label>
              <span>
                We are transforming waste management with innovative recycling
                solutions.
              </span>
              <span>
                Passionate about the environment? Excited by technology?
              </span>
              <span>
                Grow your career while helping build a greener, cleaner future!
              </span>
             </div>
            </div>
          </div>
        </div>
        <div className="container-fluid m-0 pt-0 career-container">
          <div className="row pt-5">
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="career-layout">
                <div className="career-card">
                  <span>Join Our Mission to Create a Sustainable Future!*</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0"></div>
            <div className="col-lg-6 col-sm-12 p-0"></div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="career-layout">
                <div className="career-card">
                  <span>
                    At RECYCHBS, we are dedicated to revolutionizing waste
                    management by connecting communities with innovative
                    recycling solutions. We believe that with the right team, we
                    can make a significant impact on our environment by reducing
                    waste and promoting sustainability.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="career-layout">
                <div className="career-card">
                  <span>
                    We are looking for passionate and driven individuals who are
                    excited about making a difference. If you have a knack for
                    technology, a passion for the environment, and want to be
                    part of a dynamic and growing team, we invite you to join
                    us!
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0"></div>
            <div className="col-lg-6 col-sm-12 p-0"></div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="career-layout">
                <div className="career-card">
                  <span>
                    Explore exciting career opportunities with us, where you can
                    contribute to meaningful work and grow your career in a
                    supportive and forward-thinking environment. Send your
                    resume to hr@recychbs.in and become part of the change we
                    are driving at RECYCHBS.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="career-layout">
                <div className="career-card">
                  <span>Together, let's build a greener, cleaner future!</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Career;
