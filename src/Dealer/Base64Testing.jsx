import React, { useState } from 'react';

const FileUpload = () => {
  const [fileName, setFileName] = useState(null);

  // Handles file change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);  // Store the file name

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        sendFileToDjango(base64String);  // Send base64 string to Django
      };

      reader.readAsDataURL(file);  // Convert file to base64
    }
  };

  // Function to send the base64 string to Django backend
  const sendFileToDjango = async (base64String) => {
    try {
      // const response = await fetch('http://127.0.0.1:8000/upload-file/', {
      const response = await fetch('https://recychbs-backend.onrender.com/upload-file/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64String, file_name: fileName }),
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error while uploading file:', error);
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  );
};

export default FileUpload;
