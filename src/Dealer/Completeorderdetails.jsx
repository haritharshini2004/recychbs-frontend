import { useLocation } from "react-router-dom";
import Headerdealer from "../component/Headerdealer";

function Completeorderdetail() {
  const location = useLocation();
  const entry = location.state?.entry || {};

  // Inline styles
  const styles = {
    cardBox: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      margin: '20px 0',
    },
    title: {
      fontSize: '24px',
      marginBottom: '25px',
      textAlign: 'center'
    },
    paragraph: {
      fontSize: '16px',
      margin: '10px 0',
    },
    strong: {
      color: '#333',
    },
  };

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div style={styles.cardBox}>
          <h2 style={styles.title}>Order Details</h2>
          <p style={styles.paragraph}><strong style={styles.strong}>Scrap Type:</strong> {entry.scrapType}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Scrap Condition:</strong> {entry.scrapCondition}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Weight:</strong> 1 Kg{entry.weight}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Amount:</strong> 100{entry.amount}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Address:</strong> {entry.address}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Phone Number:</strong> {entry.phoneno}</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Date:</strong> Details from admin</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Time:</strong> Details from admin</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Price Given:</strong> Details from admin</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Scrap:</strong> Details from admin</p>
          <p style={styles.paragraph}><strong style={styles.strong}>Status:</strong> Details from admin</p>
        </div>
      </div>
    </>
  );
}

export default Completeorderdetail;
