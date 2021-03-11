import React from 'react';
import './Button.css';

const Button = ({ onClick, type, className, children, ...rest }) => {
  return (
    <button
      className={`button ${className ? className : ''}`}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
