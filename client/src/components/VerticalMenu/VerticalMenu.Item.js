import React from 'react';
import ToolTip from '../ToolTip/ToolTip';

const VerticalMenuItem = ({ text, offset, onClick, children }) => {
  return (
    <ToolTip text={text} offset={offset}>
      <div className="menu-icon item" onClick={onClick}>
        {children}
      </div>
    </ToolTip>
  );
};

export default VerticalMenuItem;
