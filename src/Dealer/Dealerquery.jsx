 
import React, { useState } from 'react';
import Headerdealer from '../component/Headerdealer';
 
const Dealerquery = () => {
 
  const [message, setMessage] = useState('');
 
 
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Message submitted: ${message}`);
  
    setMessage('');
  };
 
  const handleCancel = () => {
 
    setMessage('');
  };
 
  return (
   <>
   <Headerdealer/>
    <div className='container-fluid topbottom'>
     
     <form onSubmit={handleSubmit}>
       <div style={{ marginBottom: '10px' }}>
         <label htmlFor="message">Enter Queries:</label>
         <textarea
           id="message"
           value={message}
           onChange={handleChange}
           rows="4"
           style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
         />
       </div>
       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
           Submit
         </button>
         <button
           type="button"
           onClick={handleCancel}
           style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
         >
           Cancel
         </button>
       </div>
     </form>
   </div>
   </>
  );
};
 
export default Dealerquery;