// import Header from "../component/Header";
// import { useRef, useState, useEffect } from "react";
// import { FiUploadCloud, FiCheckCircle } from "react-icons/fi"; // Import the check icon
// import { useNavigate } from "react-router-dom";

// const Scrapselect = () => {
//   const [data, setData] = useState([]);
//   const [showInput, setShowInput] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [uploadedFileDetails, setUploadedFileDetails] = useState({ name: '', size: 0 });
//   const [errorMessage, setErrorMessage] = useState("");

//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('https://www.recychbsadmin.in/SelectScrap/')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleToggleInput = () => {
//     setShowInput(prev => !prev);
//   };

//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setSelectedItems(prev => [...prev, value]);
//     } else {
//       setSelectedItems(prev => prev.filter(item => item !== value));
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedFile(file);
//       setUploadedFileDetails({ name: file.name, size: file.size });
//       setErrorMessage("");
//     }
//   };

//   const handleConfirm = async (event) => {
//     event.preventDefault();

//     if (selectedItems.length === 0 && !uploadedFile) {
//       setErrorMessage("Please select at least one scrap item or upload an image before confirming.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('selectedItems', JSON.stringify(selectedItems));
//     if (uploadedFile) {
//       formData.append('selectedFile', uploadedFile);
//     }

//     const csrfToken = getCookie('csrftoken');

//     try {
//       const response = await fetch('https://www.recychbsadmin.in/ScrapSelection/', {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//         headers: {
//           "X-CSRFToken": csrfToken,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Response:', data);
//         navigate("/Bookdealer");
//       } else {
//         console.error('Error:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.startsWith(`${name}=`)) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container-fluid topbottom-user">
//         <div style={{ display: "flex", padding: "20px", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: "30px", fontWeight: "800", color: "#000" }}>Select the Scraps</span>
//         </div>
//         <div className="row">
//           {data.map((item, index) => (
//             <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="pricecard">
//                 <div className="col-6">
//                   <img src={item.Scrap_Image} className="scrapimg-select" alt={item.Scrap_Name} />
//                 </div>
//                 <div className="col-3 d-flex">
//                   <div className="flex-column d-flex">
//                     <span>{item.Scrap_Name}</span>
//                     <span>{item.Current_Price_Per_KG}</span>
//                   </div>
//                 </div>
//                 <div className="col-4 d-flex align-items-center justify-content-center">
//                   <input
//                     type="checkbox"
//                     value={item.Scrap_Name}
//                     onChange={handleCheckboxChange}
//                     style={{ height: "20px", width: "20px", cursor: "pointer" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div>
//           <div className="otherscrap" onClick={handleToggleInput}>Other Scraps</div>
//           {showInput && (
//             <div className="otherscrap-upload">
//               <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
//               <div
//                 style={{ cursor: "pointer", fontSize: "24px", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 {uploadedFile ? (
//                   <FiCheckCircle className="uploadicon" style={{ color: "green", fontSize: "48px" }} />
//                 ) : (
//                   <FiUploadCloud className="uploadicon" />
//                 )}
//                 <span style={{ fontSize: "12px" }}>
//                   {uploadedFile ? "File Uploaded!" : "Upload scrap image"}
//                 </span>
//               </div>
//             </div>
//           )}
//           {uploadedFile && (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <span>Uploaded File: {uploadedFileDetails.name}</span><br />
//               <span>Size: {(uploadedFileDetails.size / 1024).toFixed(2)} KB</span>
//             </div>
//           )}
//         </div>
//         {errorMessage && (
//           <div style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
//             {errorMessage}
//           </div>
//         )}
//         <div className="submit-button" onClick={handleConfirm}>Confirm</div>
//       </div>
//     </>
//   );
// };

// export default Scrapselect;

import Header from "../component/Header";
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
import { useRef, useState,useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Scrapselect = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.recychbsadmin.in/User_Scrap_Type/')
      .then(response => response.json())
      .then(data =>{ 
        setData(data);
    
    
    })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

const scrapDetail = []

// Loop based on the response data length
for (let i = 0; i < data.length; i++) {
  scrapDetail.push({
    title: data[i].Scrap_Name,
    cost: data[i].Current_Price_Per_KG,
    scrapimg: data[i].Scrap_Image
  });
}

console.log(scrapDetail);

  // const scrapDetail = [
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

  const [showInput, setShowInput] = useState(false);
  const [selectedScraps, setSelectedScraps] = useState(Array(scrapDetail.length).fill(false));
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); 
  const [uploadedFileDetails, setUploadedFileDetails] = useState({ name: '', size: 0 });

  const handleToggleInput = () => {
    setShowInput((prevState) => !prevState);
  };


  const [selectedItems, setSelectedItems] = useState([]);

  console.log(selectedItems);
  

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add the value if the checkbox is checked
      setSelectedItems([...selectedItems, value]);
    } else {
      // Remove the value if the checkbox is unchecked
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  };
  
  const [selectedFiles, setSelectedFiles] = useState(null);

   // Handling file input change
   const handleFileChange = (event) => {
    setSelectedFiles(event.target.files[0]);
  };
    // Handle form submission
  // const handleSubmit = async (event) => {

  // };


  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Selected file:', file);
  //     setUploadedFile(file); 
  //     setUploadedFileDetails({ name: file.name, size: file.size });
  //     setErrorMessage(""); 
  //   }
  // };

  // const handleCheckboxChange = (index) => {
  //   const newSelectedScraps = [...selectedScraps];
  //   newSelectedScraps[index] = !newSelectedScraps[index];
  //   setSelectedScraps(newSelectedScraps);
  //   setErrorMessage(""); 
  // };

  const navigate = useNavigate();

  const handleConfirm = async (event) => {  
    event.preventDefault();


    // const uploadFile = new FormData();
    // // Append file data
    // for (const [key, file] of Object.entries(fileNames)) {
    //   if (file) {
    //     uploadFile.append(key, file); // Append the actual File object, not just its name
    //   }
    // }
    // console.log(uploadFile[fileNames]);



        // Create a FormData object
        const formData = new FormData();
        formData.append('selectedItems', JSON.stringify(selectedItems)); // Sending selected checkboxes as JSON
        formData.append('selectedFile', selectedFiles); // Sending the file

        console.log(formData);
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
    
        const csrfToken = getCookie('csrftoken'); // Function to get the CSRF token
 
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === `${name}=`) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    // Send the selectedItems to the Django backend using fetch https://django-djreact-app-d5af3d4e3559.herokuapp.com
    try {
      // Send the form data to the server
      const response = await fetch(
        // 'http://localhost:8000/ScrapSelection/',
        'https://www.recychbsadmin.in/ScrapSelection/',
        {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
      navigate("/Bookdealer");

    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
    const isAnySelected = selectedScraps.some(selected => selected);
    if (!isAnySelected && !uploadedFile) {
      setErrorMessage("Please select at least one scrap item or upload an image before confirming.");
    } 
  };

  return (
    <>
      <Header />
      <div className="container-fluid topbottom-user">
        <div
          style={{
            display: "flex",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "30px", fontWeight: "800", color: "#000" }}>
            Select the Scraps
          </span>
        </div>
        <div className="row">
          {scrapDetail.map((item, index) => (
            <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="pricecard">
                <div className="col-6">
                  <img
                    src={item.scrapimg}
                    className="scrapimg-select"
                    alt={item.title}
                  />
                </div>
                <div className="col-3 d-flex">
                  <div className="flex-column d-flex">
                    <span>{item.title}</span>
                    <span>{item.cost}</span>
                  </div>
                </div>
                {/* <div className="col-3 d-flex align-items-center justify-content-center">
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "20px", cursor: "pointer" }}
                    value={item.title}
                    checked={selectedScraps[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div> */}
                <div className="col-4 d-flex align-items-center justify-content-center">
                <input
                  type="checkbox"
                  value={JSON.stringify({ title: item.title, cost: item.cost, scrapimg: item.scrapimg })}
                  onChange={handleCheckboxChange}
                  style={{ height: "20px", width: "20px", cursor: "pointer" }}
                />

                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="otherscrap" onClick={handleToggleInput}>
            Other Scraps
          </div>
          {showInput && (
            <div className="otherscrap-upload">
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div
                style={{
                  cursor: "pointer",
                  fontSize: "24px",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleClick}
              >
                <FiUploadCloud className="uploadicon" />
                <span style={{ fontSize: "12px" }}>Upload scrap image</span>
              </div>
            </div>
          )}
          {uploadedFile && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <span>Uploaded File: {uploadedFileDetails.name}</span><br />
              <span>Size: {(uploadedFileDetails.size / 1024).toFixed(2)} KB</span>
            </div>
          )}
        </div>
        {errorMessage && (
          <div style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
            {errorMessage}
          </div>
        )}
        <div className="submit-button" onClick={handleConfirm}>
          Confirm
        </div>
      </div>
    </>
  );
};

export default Scrapselect;
