import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Link,
  useTheme,
  IconButton,
} from '@mui/material';
import Mark from '../../../assets/Pictures/Mark';
import { NavLink } from 'react-router-dom';
import useApplicationTheme from '../../hooks/useApplicationTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const PublicNavigation = ({
  appBarStyle,
  appBarProps,
  toolBarStyle,
  toolBarProps,
  linkStyle,
  transparent = false,
}) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useApplicationTheme();

  const renderToggleThemeButton = () => {
    return mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={mode === 'dark' ? 5 : 2}
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
              <Link component={NavLink} to="/" style={{ display: 'flex' }}>
                <Mark size={48} />
              </Link>
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <IconButton sx={{ mr: 1 }} onClick={toggleTheme}>
                {renderToggleThemeButton()}
              </IconButton>
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
            </Box>
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
