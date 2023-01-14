import { IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

interface Props {
  name: string;
  icon: JSX.Element;
  onClick: () => any;
}

const SocialBox = ({ name, icon, onClick }: Props) => {
  const handleSelect = (e?: any) => {
    if (e) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Paper sx={style} area-label={name} onClick={handleSelect} elevation={3}>
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
