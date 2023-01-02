import { Button, Link, IconButton, useTheme, Theme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useApplicationTheme from '../../hooks/useApplicationTheme';

const linksData = [
  { id: 1, name: 'Login', route: '/login' },
  { id: 2, name: 'Register', route: '/register' },
];

const NavigationLinks = ({ linkStyle }: any) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useApplicationTheme();

  return (
    <Box
      component="ul"
      aria-label="navigation-links"
      display="inline-flex"
      sx={{ listStyle: 'none', marginLeft: 'auto' }}
    >
      <li>
        <IconButton
          sx={{ mr: 1 }}
          onClick={toggleTheme}
          aria-label="toggle theme"
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </li>
      {linksData.map((item, index) => (
        <li key={index}>
          <Link
            component={NavLink}
            to={item.route}
            sx={{ ...defaultLinkStyle(theme), ...linkStyle }}
          >
            <Button
              color="primary"
              aria-label={item.name}
              variant="contained"
              sx={{ mr: 1 }}
            >
              {item.name}
            </Button>
          </Link>
        </li>
      ))}
    </Box>
  );
};

const defaultLinkStyle = (theme: Theme) => ({
  color: theme.palette.primary.contrastText,
});

export default NavigationLinks;
