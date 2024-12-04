import React, { useState } from 'react';
import Headerdealer from '../component/Headerdealer';
 
const  Dealerlanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
 
  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };
 
  return (
   <>
   <Headerdealer/>
   <div className="container-fluid topbottom">
   <div style={{display:'flex', alignItems:'center',flexDirection:"column",fontWeight:"700"}}>
   <h1>Change Language</h1>
   </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <label
          style={{
            fontSize: '20px',
            margin: '10px',
            cursor: 'pointer',
            backgroundColor:"#ded9d9",
            padding:"10px 20px",
            fontWeight:"700"
          }}
        >
          <input
            type='radio'
            name='language'
            value='Tamil'
            checked={selectedLanguage === 'Tamil'}
            onChange={handleChangeLanguage}
            style={{marginRight:'10px'}}
          />
          Tamil
        </label>
        <label
          style={{
            fontSize: '20px',
            margin: '10px',
            cursor: 'pointer',
            backgroundColor:"#ded9d9",
            padding:"10px 20px",
            fontWeight:"700"
          }}
        >
          <input
            type='radio'
            name='language'
            value='English'
            checked={selectedLanguage === 'English'}
            onChange={handleChangeLanguage}
            style={{marginRight:'10px'}}
          />
          English
        </label>
        <label
          style={{
            fontSize: '20px',
            margin: '10px',
            cursor: 'pointer',
            backgroundColor:"#ded9d9",
            padding:"10px 20px",
            fontWeight:"700"
          }}
        >
          <input
            type='radio'
            name='language'
            value='Telugu'
            checked={selectedLanguage === 'Telugu'}
            onChange={handleChangeLanguage}
            style={{marginRight:'10px'}}
          />
          Telugu
        </label>
        <label
          style={{
            fontSize: '20px',
            margin: '10px',
            cursor: 'pointer',
            backgroundColor:"#ded9d9",
            padding:"10px 20px",
            fontWeight:"700"
          }}
        >
          <input
            type='radio'
            name='language'
            value='Hindi'
            checked={selectedLanguage === 'Hindi'}
            onChange={handleChangeLanguage}
            style={{marginRight:'10px'}}
          />
          Hindi
        </label>
      </div>
      <div style={{display:'flex', alignItems:'center',flexDirection:"column",fontWeight:"700"}}>
      <button
        onClick={() => alert(`Language changed to: ${selectedLanguage}`)}
        style={{
          padding: '5px 20px',
          fontSize: '17px',
          cursor: 'pointer',
          marginLeft:'20px',
          backgroundColor:'#777',
          color:'white',
          marginTop:"20px",
          borderRadius:"5px"
        }}
      >
        Change
      </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Selected Language: <span style={{fontWeight:"900"}}>{selectedLanguage}</span></p>
      </div>

    </div>
   </>
  );
};
 
export default Dealerlanguage;
 