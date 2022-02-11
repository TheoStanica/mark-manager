import { IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

const SocialBox = ({ name, icon, onClick }) => {
  const handleSelect = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Paper sx={style} area-label={name} onClick={handleSelect}>
      <IconButton onClick={handleSelect} sx={iconStyle}>
        {icon}
      </IconButton>
      <Typography>{name}</Typography>
    </Paper>
  );
};

const style = {
  p: 4,
  cursor: 'pointer',
  bgcolor: 'background.default',
};

const iconStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
};

export default SocialBox;
