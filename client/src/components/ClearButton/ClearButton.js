import React from 'react';
import { StyledClearButton } from './styles';

const ClearButton = ({ children, onClick, style }, ref) => {
  return (
    <StyledClearButton ref={ref} onClick={onClick} style={style}>
      {children}
    </StyledClearButton>
  );
};

export default React.forwardRef(ClearButton);
