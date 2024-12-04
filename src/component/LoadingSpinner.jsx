import React from 'react';
import loading from '../assets/gif/loadingwhite.mp4';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <video src={loading} autoPlay loop muted playsInline />
    </div>
  );
};

export default LoadingSpinner;
