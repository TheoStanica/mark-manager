import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import Mark from '../../../assets/Pictures/Mark';
import Link from '../../../core/components/Link/Link';

const PublicNavigation = ({
  appBarStyle,
  appBarProps,
  toolBarStyle,
  toolBarProps,
  linkStyle,
  transparent = false,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={5}
        color={transparent ? 'transparent' : 'inherit'}
        {...appBarProps}
        sx={{ ...appBarStyle }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              ...toolBarDefaultStyle,
              ...toolBarStyle,
            }}
            {...toolBarProps}
          >
            <Box sx={{ mr: 2 }}>
              <Link to="/" style={{ display: 'flex' }} aria-label="Mark">
                <Mark size={48} />
              </Link>
            </Box>
            <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
              Mark
            </Typography>
            <Button color="inherit" sx={{ mr: 1 }}>
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
        </Container>
      </AppBar>
    </Box>
  );
};

// const appBarDefaultStyle = (transparent) => ({
//   color: transparent ? 'transparent' : 'red',
// });

const toolBarDefaultStyle = {
  '@media (min-width: 600px)': { padding: 0 },
  padding: 0,
};

export default PublicNavigation;
