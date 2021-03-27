import React, { forwardRef } from 'react';
import { StyledCard } from './styles';

const Card = ({ children, style }, ref) => {
  return (
    <StyledCard ref={ref} style={style}>
      {children}
    </StyledCard>
  );
};

export default forwardRef(Card);
