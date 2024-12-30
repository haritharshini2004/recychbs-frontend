import React, { useState, useEffect } from "react";
import bottle from "../assets/image/bottle.jpeg";
import card from "../assets/image/card.jpeg";
import cocount from "../assets/image/cocount.jpeg";
import drum from "../assets/image/drum.jpeg";
import glass from "../assets/image/glass.jpeg";
import iron2 from "../assets/image/iron2.jpeg";
import mbl from "../assets/image/mbl.jpeg";
import paper from "../assets/image/paper.jpeg";
import scrap from "../assets/image/scrap.jpeg";
import scrap1 from "../assets/image/scrap1.jpeg";
import scrap2 from "../assets/image/scrap2.jpeg";
import scrap3 from "../assets/image/scrap3.jpeg";
import scrap4 from "../assets/image/scrap4.jpeg";
import tyre from "../assets/image/tyre.jpeg";
import wire from "../assets/image/wire.jpeg";
import Headerdealer from "../component/Headerdealer";
import Bottomdealer from "../component/Bottomdealer";

function Todayscrap() {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://recychbs-7f558d40e2a6.herokuapp.com/Get-Scrap-Type/')
      .then(response => response.json())
      .then(data =>{ 
        setData(data);
        setLoading(false)
    })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

const items = []

// Loop based on the response data length
for (let i = 0; i < data.length; i++) {
  items.push({
    title: data[i].Scrap_Name,
    cost: data[i].Current_Price_Per_KG,
    scrapimg: data[i].Scrap_Image
  });
}
console.log(items);
  return (
    <>
    <Headerdealer/>
    <div className="container-fluid topbottom">
        <div className="row m-0 p-0">
          
          <div
            style={{
              display: "flex",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className="dealer-title"
            >
                UPDATED SCRAP PRICES
            </span>
          </div>
          {items.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="homecard">
                <div>
                  <img
                    src={item.scrapimg}
                    style={{ height: "310px", width: "100%",borderRadius:"5px" }}
                  />
                </div>
                <p
                  style={{
                    color: "#000",
                    fontSize: "20px",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  Title:{" "}
                  <span
                    style={{
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {item.title}
                  </span>
                </p>
                <p
                  style={{ color: "#000", fontSize: "20px", fontWeight: "600" }}
                >
                  Price:{" "}
                  <span
                    style={{
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    ${item.cost}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Todayscrap;
