import React, { useEffect, useRef } from 'react';
import { StyledMkToolTip, StyledMkToolTipSpan } from './styles';

const ToolTip = ({ children, text, offset }) => {
  const tooltip = useRef(null);

  useEffect(() => {
    tooltip.current.style.left = `calc(100% + ${offset}px)`;
  }, [offset]);

  return (
    <StyledMkToolTip>
      {children}
      <StyledMkToolTipSpan ref={tooltip}>
        {text ? text : 'Tooltip'}
      </StyledMkToolTipSpan>
    </StyledMkToolTip>
  );
};

export default ToolTip;
