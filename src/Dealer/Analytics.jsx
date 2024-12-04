import { MdArrowForwardIos } from "react-icons/md";
import logotrans from "../assets/image/logotrans.png";
import { useNavigate } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";


function Analytics() {
  const navigate = useNavigate()
  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="d-flex flex-column analytic-card">
              <span style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}>Day Earning :</span>
              <span style={{ color: "green", fontWeight: "800", fontSize: "20px" }}>₹ 600</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="d-flex flex-column analytic-card">
              <span style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}>Week Earning :</span>
              <span style={{ color: "green", fontWeight: "800", fontSize: "20px" }}>₹ 600</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="d-flex flex-column analytic-card">
              <span style={{ color: "#000", fontWeight: "800", fontSize: "20px" }}>Month Earning :</span>
              <span style={{ color: "green", fontWeight: "800", fontSize: "20px" }}>₹ 600</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
export default Analytics;
