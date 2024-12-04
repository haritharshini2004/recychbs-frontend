import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import logo from "../assets/image/istockphoto.jpg";
import logo1 from "../assets/image/recyc.jpeg";
import logo2 from "../assets/image/Designer.png";
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
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
 
function Homeuser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const slides = [logo, logo1, logo2];
 
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000); // Change to 2 seconds
    return () => clearInterval(interval);
  }, [slides.length]);
 
 
  const handlePrevClick = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
 
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.recychbsadmin.in/User_Scrap_Type/')
      .then(response => response.json())
      .then(data =>{ 
        setData(data);
    
    
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

  // const items = [
  //   { title: "PLASTIC", cost: 500, scrapimg: bottle },
  //   { title: "CARBOARD", cost: 556, scrapimg: card },
  //   { title: "COCONUT SHELL", cost: 500, scrapimg: cocount },
  //   { title: "SYNTEX TANKS", cost: 500, scrapimg: drum },
  //   { title: "GLASSES", cost: 570, scrapimg: glass },
  //   { title: "IRON", cost: 556, scrapimg: iron2 },
  //   { title: "E-WASTE", cost: 556, scrapimg: mbl },
  //   { title: "NOTE & BOOKS", cost: 556, scrapimg: paper },
  //   { title: "PVC PIPES", cost: 556, scrapimg: scrap },
  //   { title: "BRONZE", cost: 556, scrapimg: scrap1 },
  //   { title: "ALUMINIUM", cost: 556, scrapimg: scrap2 },
  //   { title: "COPPER", cost: 556, scrapimg: scrap3 },
  //   { title: "BATTERIES", cost: 556, scrapimg: scrap4 },
  //   { title: "TYRES", cost: 556, scrapimg: tyre },
  //   { title: "ELECTRICAL WIRES", cost: 556, scrapimg: wire },
  // ];
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cost.toString().includes(searchQuery) // Search by title or cost
  );
  const navigate = useNavigate();
 
  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
      <div className="slideshow-container" style={{ position: "relative", overflow: "hidden" }}>
          {slides.map((src, index) => (
            <div
              key={index}
              className={`slide ${index === activeIndex ? "slide-active" : "slide-hidden"}`}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transform: index === activeIndex ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.5s ease",
              }}
            >
              <img
                src={src}
                className="homeuser-img"
                alt="Slide"
              />
            </div>
          ))}
        </div>
        
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
            className="mainhead"
             
            >
                UPDATED SCRAP PRICES
            </span>
          </div>
          <div className="search-header-container" style={{ display: 'flex', justifyContent: 'center', padding: '10px 0',alignItems:"center" }}>
          <div style={{ position: "relative", display:"flex", marginRight: '10px',width:"100%",boxShadow:"0px 4px 10px rgba(88, 76, 76, 0.5)",borderRadius:"50px",height:"35px",margin:"0 10px" }}>
            <CiSearch className="search-headerIcon" />
            <input
              className="search-header"
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery} 
            />
          </div>
        </div>
          {filteredItems.map((item, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-2">
            <div className="homecard">
                <div>
                  <img
                    src={item.scrapimg}
                    className="scrapimg"
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
                    ₹{item.cost}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-fixed-btn">
        <div class="ring"></div>
        <button
          onClick={() => navigate("/Scrapselect")}
        >
          Book Dealer
        </button>
      </div>
      </div>
     
      <Footer/>
    </>
  );
}
 
export default Homeuser;
 