import React, { useEffect, useRef, useState } from 'react';
import { StyledMkToolTip, StyledMkToolTipSpan } from './styles';

const ToolTip = ({ children, text, offset, position }) => {
  const tooltip = useRef(null);
  const wrapper = useRef(null);
  const [spanWidth, setSpanWidth] = useState(0);

  useEffect(() => {
    setSpanWidth(wrapper.current.clientWidth);
  }, [offset]);

  return (
    <StyledMkToolTip ref={wrapper}>
      {children}
      <StyledMkToolTipSpan
        ref={tooltip}
        position={position ? position : 'right'}
        spanWidth={spanWidth}
        offset={offset}
      >
        {text ? text : 'Tooltip'}
      </StyledMkToolTipSpan>
    </StyledMkToolTip>
  );
};

export default ToolTip;
