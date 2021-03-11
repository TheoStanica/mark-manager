import React, { useEffect, useRef } from 'react';
import './ToolTip.css';

const ToolTip = ({ children, text, offset }) => {
  const tooltip = useRef(null);

  useEffect(() => {
    tooltip.current.style.left = `calc(100% + ${offset}px)`;
  }, [offset]);

  return (
    <div className="mktooltip">
      {children}
      <span className="tooltiptext" ref={tooltip}>
        {text ? text : 'Tooltip'}
      </span>
    </div>
  );
};

export default ToolTip;
