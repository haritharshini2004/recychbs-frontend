import React, { useEffect, useState } from 'react';

const DisplayUploadedFile = () => {
  const [imageUrl, setImageUrl] = useState(null);  // Store the image URL

  // Function to fetch the file from Django and display it
  const fetchAndDisplayFile = async () => {
    try {
      // const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/get-file/');
      const response = await fetch('https://recychbs-7f558d40e2a6.herokuapp.com/get-file/');
      const fileData = await response.json();

      // Create a Blob from the base64 string and generate a URL for the image
      const base64Response = await fetch(`data:image/png;base64,${fileData.file_data}`);
      const blob = await base64Response.blob();
      const url = URL.createObjectURL(blob);
      console.log(url)

      setImageUrl(url);  // Set the image URL to state
    } catch (error) {
      console.error('Error fetching the file:', error);
    }
  };

  // Fetch the file when the component mounts
  useEffect(() => {
    fetchAndDisplayFile();
  }, []);

  return (
    <div>
      <h3>Uploaded File</h3>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded File" id="uploadedImage" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>No file to display</p>
      )}
    </div>
  );
};

export default DisplayUploadedFile;
