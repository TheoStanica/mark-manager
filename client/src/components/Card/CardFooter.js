import React from 'react';
import { StyledCardFooter } from './styles';

const CardFooter = ({ children, style }) => {
  return <StyledCardFooter style={style}>{children}</StyledCardFooter>;
};

export default CardFooter;
