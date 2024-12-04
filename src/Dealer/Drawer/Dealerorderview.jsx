import { useLocation } from 'react-router-dom';
import Headerdealer from '../../component/Headerdealer';

function Dealerorderview() {
  const location = useLocation();
  const { item } = location.state || {}; // Destructure the item object from state

  if (!item) {
    return <p>No order details available.</p>;
  }

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    item: {
      fontSize: '16px',
      margin: '10px 0',
      color: '#333',
    },
  };

  return (
    <>
      <Headerdealer />
      <div className="container-fluid topbottom">
        <div style={styles.container}>
          <h3 style={styles.title}>Order Details</h3>
          <p style={styles.item}><strong>ID:</strong> {item.id}</p>
          <p style={styles.item}><strong>Order:</strong> {item.name}</p>
          <p style={styles.item}><strong>Amount:</strong> {item.amount}</p>
          <p style={styles.item}><strong>Status:</strong> {item.status}</p>
        </div>
      </div>
    </>
  );
}

export default Dealerorderview;
