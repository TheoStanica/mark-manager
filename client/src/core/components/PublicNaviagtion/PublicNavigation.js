import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Link,
  useTheme,
} from '@mui/material';
import Mark from '../../../assets/Pictures/Mark';
import { NavLink } from 'react-router-dom';

const PublicNavigation = ({
  appBarStyle,
  appBarProps,
  toolBarStyle,
  toolBarProps,
  linkStyle,
  transparent = false,
}) => {
  const theme = useTheme();

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
              <Link component={NavLink} to="/">
                <Mark size={48} />
              </Link>
            </Box>
            <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
              Mark
            </Typography>
            <Button color="inherit" sx={{ mr: 1 }}>
              <Link
                component={NavLink}
                to="/login"
                sx={{ ...defaultLinkStyle(theme), ...linkStyle }}
              >
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                component={NavLink}
                to="/register"
                sx={{ ...defaultLinkStyle(theme), ...linkStyle }}
              >
                Register
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

const defaultLinkStyle = (theme) => ({
  color: theme.palette.primary.contrastText,
});

const toolBarDefaultStyle = {
  '@media (min-width: 600px)': { padding: 0 },
  padding: 0,
};

export default PublicNavigation;
