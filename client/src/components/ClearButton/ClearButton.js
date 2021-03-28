import React from 'react';
import { StyledClearButton } from './styles';

const ClearButton = ({ children, onClick, style }) => {
  return (
    <StyledClearButton onClick={onClick} style={style}>
      {children}
    </StyledClearButton>
  );
};

export default ClearButton;
