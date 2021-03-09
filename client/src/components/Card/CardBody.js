import React from 'react';

const CardBody = ({ children, className }) => {
  return (
    <div className={`card-body ${className ? className : ''}`}>{children}</div>
  );
};

export default CardBody;
