import React from 'react';
import Button from '@mui/material/Button';

const GradientButton = ({ children, sx, ...props }) => {
  return (
    <Button {...props} sx={{ ...style, ...sx }}>
      {children}
    </Button>
  );
};

const style = {
  background: 'linear-gradient(60deg, #7e84ff 10%,  #75fac8 90%)',
  border: 0,
  borderRadius: 0.5, // this doesn't seem to be workging fine? Original: 3
  color: 'black',
  height: 48,
  padding: '0 30px',
  fontWeight: 600,
};

export default GradientButton;
