import React from 'react';
import './ClearButton.css';

const ClearButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`clear-button ${className ? className : ''}`}
    >
      {children}
    </button>
  );
};

export default ClearButton;
