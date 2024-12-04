import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Successful() {
  const [showTick, setShowTick] = useState(false);
  const navigate = useNavigate();

  const pressHandler = () => {
    navigate("/");
  };

  const handleAnimationEnd = () => {
    setShowTick(true);
  };

  useEffect(() => {
    if (showTick) {
      const timer = setTimeout(() => {
        navigate("/OngoingOrder");
      }, 500); // Adjust the delay as needed

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [showTick, navigate]);

  return (
    <div className="successful-main">
      <div className="successful-box">
        <div className={`anim-tick ${showTick ? "show-tick" : ""}`} onAnimationEnd={handleAnimationEnd}>
          <div className="tick-animation"></div>
          {showTick && <FaCheck className="successful-icon" />}
        </div>
        <h3 className="mt-4">Thank You!</h3>
        <h6 className="successful-ptext">Your details have been successfully submitted. Thanks!</h6>
      </div>
    </div>
  );
}

export default Successful;
