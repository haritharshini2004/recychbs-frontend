import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";

function Dealerlogopage() {
  const navigate = useNavigate();
  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Dealerlanguage")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Language
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Dealereditdetail")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Edit Details
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Dealerquery")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Queries
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Dealerqns")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Questions & Answer
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/DealerTerm")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Terms & Condition
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div
              class="d-flex justify-content-between align-items-center userlogo-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/Dealerfaq")}
            >
              <span
                style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}
              >
                Frequently Asked Questions
              </span>
              <MdArrowForwardIos className="orders-button-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dealerlogopage;
