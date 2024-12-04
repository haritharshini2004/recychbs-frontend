import logo from "../../assets/image/logotrans.png";
import Header from "../../component/Header";
import recycling from "../../assets/image/recycling.jpg";
import scrapcar from "../../assets/image/scrap-car.jpg";
import hands from "../../assets/image/hands.webp";

const Becomedealer = () => {
  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user mx-0 px-0" style={{backgroundColor:"#fff"}}>
        <div className="aboutus-header">
          {/* <img src={logo} style={{ height: "200px", width: "250px" }} /> */}
          <span></span>
          <span>BECOME DEALER</span>
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
              <div className="aboutus-card">
                <span>
                Join the RECYCHBS network as a dealer and unlock new opportunities
            in the scrap recycling industry. As a dealer, you’ll gain access to
            a steady stream of scrap materials, competitive pricing, and the
            backing of a trusted brand committed to environmental
            sustainability. Our platform connects you with customers in your
            area, streamlines the process from collection to payment, and
            ensures transparency at every step. Whether you’re looking to expand
            your business or start a new venture, RECYCHBS provides the tools
            and support you need to succeed. Partner with us and be a part of
            the green revolution!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Becomedealer;
