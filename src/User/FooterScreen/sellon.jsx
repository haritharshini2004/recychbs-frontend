import logo from "../../assets/image/logotrans.png";
import Header from "../../component/Header";
import recycling from "../../assets/image/recycling.jpg";
import scrapcar from "../../assets/image/scrap-car.jpg";
import hands from "../../assets/image/hands.webp";

const Sellon = () => {
  return (
    <>
       <Header />
      <div className="container-fluid topbottom-user mx-0 px-0" style={{backgroundColor:"#fff"}}>
        <div className="aboutus-header">
          {/* <img src={logo} style={{ height: "200px", width: "250px" }} /> */}
          <span></span>
          <span>SELL{ } ON</span>
        </div>
        <div className="container-fluid m-0 pt-0 aboutus-layout">
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card">
                <img
                  src={recycling}
                  className="Responsiveimg"
                  alt="Responsive Image"
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-0">
              <div className="aboutus-card flex-column">
                <label>
                Turn Your Scrap into Profit with RECYCHBS – Empowering You for a Cleaner Future!
                </label>
                <span>
                Join hands with us at RECYCHBS and turn your scrap into profit while
            contributing to a cleaner environment. By selling your scrap through
            our platform, you gain access to a seamless, transparent, and
            hassle-free process. We provide fair prices, secure transactions,
            and timely payments. Whether you're an individual or a business,
            RECYCHBS offers a convenient solution to monetize your scrap, reduce
            waste, and support sustainable practices. Start selling with us
            today and be part of a greener future!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sellon;
