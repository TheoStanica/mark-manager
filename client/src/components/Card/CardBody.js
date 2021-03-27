import React from 'react';
import { StyledCardBody } from './styles';

const CardBody = ({ children, style }) => {
  return <StyledCardBody style={style}>{children}</StyledCardBody>;
};

export default CardBody;
