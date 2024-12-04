import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import './Alert.css';

const Alert = ({ type, message, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck style={{ color: 'green' }} />;
      case 'error':
        return <FaTimes style={{ color: 'red' }} />;
      case 'info':
        return <FaInfoCircle style={{ color: 'blue' }} />;
      case 'loading':
        return <FaSpinner className="loading-spinner" />;
      default:
        return null;
    }
  };

  const alertClass = `alert alert-${type} ${isExiting ? 'alert-exit' : ''}`;

  useEffect(() => {
    if (type === 'loading') {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 500); // Wait for the exit animation
      }, 300000); // Keep loading for 3 seconds

      return () => clearTimeout(timer);
    } else if (type !== 'loading') {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 500); // Wait for the exit animation
      }, 2000); // Auto dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <div className={alertClass}>
      <div className="alert-icon">
        {renderIcon()}
      </div>
      <div className="alert-message">
        {message}
      </div>
      {type !== 'loading' && (
        <button className="alert-close" onClick={() => {
          setIsExiting(true);
          setTimeout(onClose, 500); // Wait for the exit animation
        }}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
