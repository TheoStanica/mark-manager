import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Mark from '../../../assets/Pictures/Mark';
import Link from '../../../core/components/Link/Link';

const PublicNavigation = ({ appBarProps, toolBarProps, linkStyle }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={5} {...appBarProps}>
        <Toolbar {...toolBarProps}>
          <Box sx={{ mr: 2 }}>
            <Link to="/" style={{ display: 'flex' }} aria-label="Mark">
              <Mark size={48} />
            </Link>
          </Box>
          <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
            Mark
          </Typography>
          <Button color="inherit">
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PublicNavigation;
