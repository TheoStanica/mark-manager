import React from 'react';
import './ClearButton.css';

const ClearButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="clear-button">
      {children}
    </button>
  );
};

export default ClearButton;
