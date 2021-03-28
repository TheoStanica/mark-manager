import React from 'react';
import { StyledButton } from './styles';

const Button = ({ onClick, type, style, children, ...rest }) => {
  return (
    <StyledButton onClick={onClick} type={type} style={style} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
