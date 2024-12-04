import { MdArrowForwardIos } from "react-icons/md";
import logotrans from "../assets/image/logotrans.png";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";

function Homedealer() {
  const navigate = useNavigate();
  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="orderpage ">
          <div className="orders-section d-flex">
            <div className="col-12 col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <img src={logotrans} alt="Logo" />
            </div>

            <div className="col-12 col-lg-6 d-flex flex-column align-items-center">
              <div
                className="orders-button"
                onClick={() => navigate("/Todayscrap")}
              >
                <p className="m-0 p-0 Vollkorn-bold">Today Scrap Prices</p>
                <MdArrowForwardIos className="orders-button-icon" />
              </div>
              <div
                className="orders-button"
                onClick={() => navigate("/Scrapdetail")}
              >
                <p className="m-0 p-0 Vollkorn-bold">Ongoing Orders</p>
                <MdArrowForwardIos className="orders-button-icon" />
              </div>
              <div
                className="orders-button"
                onClick={() => navigate("/Completeorder")}
              >
                <p className="m-0 p-0 Vollkorn-bold">Complete Orders</p>
                <MdArrowForwardIos className="orders-button-icon" />
              </div>
              <div
                className="orders-button"
                onClick={() => navigate("/Analytic")}
              >
                <p className="m-0 p-0 Vollkorn-bold">Analytics</p>
                <MdArrowForwardIos className="orders-button-icon" />
              </div>
            </div>
          </div>

          <div className="financial-section">
            <div className="financial-button">
              <p className="m-0 p-0">Total Amount Earned</p>
              <p>00:00</p>
            </div>
            <div className="financial-button">
              <p className="m-0 p-0">Profit</p>
              <p>00:00</p>
            </div>
            <div className="financial-button">
              <p className="m-0 p-0">Charges</p>
              <p>00:00</p>
            </div>
          </div>
          
        </div>
      </div>
      <style>
        {`
          .orderpage {
            padding: 20px;
          }
          .orders-section {
            flex-wrap: wrap;
          }
          .orders-button {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px;
            height: 80px;
            cursor: pointer;
          }
          .orders-button-icon {
            font-size: 18px;
            margin-left: 10px;
          }
          .financial-section {
            margin-top: 20px;
          }
          .financial-button {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 10px;
          }
          @media only screen and (max-width: 768px) {
            .orders-section {
              flex-direction: column;
            }
            .orders-button {
              width: 100%;
            }
            .financial-section {
              flex-direction: column;
            }
            .financial-button {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
export default Homedealer;