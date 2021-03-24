import React, { useEffect, useRef } from 'react';
// import './ToolTip.css';
import { StyledMkToolTip, StyledMkToolTipSpan } from './styles';

const ToolTip = ({ children, text, offset }) => {
  const tooltip = useRef(null);

  useEffect(() => {
    tooltip.current.style.left = `calc(100% + ${offset}px)`;
  }, [offset]);

  return (
    <StyledMkToolTip className="mktooltip">
      {children}
      <StyledMkToolTipSpan className="tooltiptext" ref={tooltip}>
        {text ? text : 'Tooltip'}
      </StyledMkToolTipSpan>
    </StyledMkToolTip>
  );
};

export default ToolTip;
