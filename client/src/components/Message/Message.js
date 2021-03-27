import React from 'react';
import { StyledMessage } from './styles';

const Message = ({ type, children }) => {
  return <StyledMessage type={type}>{children}</StyledMessage>;
};

export default Message;
