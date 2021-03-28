import React from 'react';
import { StyledCardHeader } from './styles';

const CardHeader = ({ children, style }) => {
  return <StyledCardHeader style={style}>{children}</StyledCardHeader>;
};

export default CardHeader;
