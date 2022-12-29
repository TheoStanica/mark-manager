import React from 'react';
import { useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Link = ({ children, style, activeStyle, ...props }) => {
  const theme = useTheme();
  return (
    <NavLink
      style={{ color: theme.palette.primary.main, ...style }}
      activeStyle={{
        color: theme.palette.primary.light,
        ...activeStyle,
      }}
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default Link;
