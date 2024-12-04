import { FaHome, FaUser, FaCheckCircle, FaClock, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/image/logotrans.png";
import LocationDisplay from "./LocationDisplay";
import { IoMenuSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { BiArrowToLeft, BiHelpCircle, BiSolidUserAccount } from "react-icons/bi";
import { FcFaq } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { RiCustomerService2Line, RiListOrdered2 } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeDealerPage = location.pathname === '/Homeuser';

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

 
  const handleLogout = () => {
    // Clear authentication status
    navigate("/");

    // Prevent back navigation by modifying history
    window.history.pushState(null, "", window.location.href);

    // Disable the back button
    window.onpopstate = function (event) {
      window.history.pushState(null, "", window.location.href);
    };
  };

  // Prevent default backspace behavior on the whole document
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="header-fixed">
          <div className="headersection">
            <div style={{ display: "flex", alignItems: "center" }}>
              {!isHomeDealerPage && (
                <FaArrowLeft onClick={() => navigate(-1)} className="back-button" />
              )}
              <div className="header-logo-part">
                <img
                  src={logo}
                  style={{ height: "50px", width: "60px", margin: "0 5px" }}
                  alt="logo"
                />
                <p className="header-logo-text m-0 p-0">RECYCHBS</p>
              </div>
            </div>
            <div style={{ display: "flex", padding: "0 5px", marginLeft: "10px" }}>
              <FaLocationDot
                style={{
                  color: "#fff",
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <LocationDisplay />
            </div>
            <div style={{ display: "flex" }}>
              <div
                className="d-none d-md-block"
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={() => navigate("/Homeuser")}
              >
                <FaHome className="icons-bottom" />
              </div>
              <div
                className="d-none d-md-block"
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={() => navigate("/Userlogopage")}
              >
                <FaUser className="icons-bottom" />
              </div>
              <div style={{ position: "relative", marginLeft: "20px" }}>
                <IoIosNotifications
                  style={{
                    height: "25px",
                    width: "25px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={() => navigate("/Usernotification")}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  17
                </span>
              </div>

              <div
                className="d-none d-md-block"
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={toggleDrawer}
              >
                <IoMenuSharp className="icons-bottom" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="bottom-fixed"
          style={{
            width: "100%",
            backgroundColor: "#000",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleDrawer}
            >
              <IoMenuSharp className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Menu</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Homeuser")}
            >
              <FaHome className="icons-bottom" />
              <p className="icons-bottom-text p-0 m-0">Home</p>
            </div>
          </div>
          <div className="col-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Userlogopage")}
            >
              <FaUser className="icons-bottom text-center" />
              <p className="icons-bottom-text p-0 m-0">User</p>
            </div>
          </div>
        </div>
        <div
          className={`drawer ${drawerOpen ? "drawer-open" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#333",
            color: "#fff",
            transition: "transform 0.3s ease",
            transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
            zIndex: 1000,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <div
              style={{
                padding: "40px 20px",
                borderBottom: "2px solid #777",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: "800" }}>RECYCHBS</span>
              <RxCross2
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                onClick={() => setDrawerOpen(false)}
              />
            </div>
            <div style={{}}>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Yourbooking")}
              >
                <RiListOrdered2
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Bookings</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Useraccount")}
              >
                <BiSolidUserAccount
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Your Account</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/CompletedOrder")}
              >
                <FaCheckCircle
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Completed Orders</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/OngoingOrder")}
              >
                <FaClock
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>On Going Orders</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/Usercustomer")}
              >
                <RiCustomerService2Line
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>Customer Service</span>
              </div>
              <div
                className="drawer-menu"
                onClick={() => navigate("/FAQ")}
              >
                <FcFaq
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                />
                <span>FAQ</span>
              </div>
            </div>
          </div>
          <div
            className="drawer-menu"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <LuLogOut
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
