import React from 'react';
import './Popover.css';

const Popover = ({ children, content }) => {
  return (
    <div className="popover">
      <div className="click-zone">{children}</div>
      <div className="popup-wrapper">
        <div className="popup">{content}</div>
      </div>
    </div>
  );
};

export default Popover;
