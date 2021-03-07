import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import './Icon.css';

const Icon = ({ size, className, icon, tooltip, onClick }) => {
  return (
    <ToolTip text={tooltip}>
      <div
        className={`icon ${className ? className : ''}`}
        style={{ height: size + 'px', width: size + 'px' }}
        onClick={onClick}
      >
        <img src={icon} alt={icon} />
      </div>
    </ToolTip>
  );
};

export default Icon;
