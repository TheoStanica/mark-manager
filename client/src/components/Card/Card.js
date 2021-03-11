import React, { forwardRef } from 'react';
import './Card.css';

const Card = ({ children, className }, ref) => {
  return (
    <div ref={ref} className={`card ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default forwardRef(Card);
