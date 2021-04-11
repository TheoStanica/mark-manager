import React from 'react';
import { StyledButton } from './styles';

const Button = ({ onClick, type, style, children, ...rest }, ref) => {
  return (
    <StyledButton
      ref={ref}
      onClick={onClick}
      type={type}
      style={style}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(Button);
