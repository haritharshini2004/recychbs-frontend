import logo from "../../assets/image/logotrans.png";
import Header from "../../component/Header";
import recycling from "../../assets/image/recycling.jpg";
import scrapcar from "../../assets/image/scrap-car.jpg";
import hands from "../../assets/image/hands.webp";


const Fulfillment = () => {
  return (
    <>
      <Header />
        <div className="container-fluid topbottom-user mx-0 px-0" style={{backgroundColor:"#fff"}}>
        <div className="aboutus-header">
          {/* <img src={logo} style={{ height: "200px", width: "250px" }} /> */}
          <span></span>
          <span>FULLFILLMENT</span>
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
                Experience a new level of convenience and reliability with
            Fulfillment by RECYCHBS. We handle the entire scrap collection
            process from start to finish, ensuring that your scrap is collected,
            weighed, and valued accurately. Our dedicated team manages
            logistics, quality checks, and secure payments, allowing you to
            focus on what matters most—growing your business. With RECYCHBS, you
            benefit from efficient service, timely pickups, and a trusted
            partnership that prioritizes your satisfaction. Let us take care of
            the heavy lifting while you enjoy the rewards.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Fulfillment;
