import { useTheme } from '@emotion/react';
import { Button, Link, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useApplicationTheme from '../../hooks/useApplicationTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const linksData = [
  { id: 1, name: 'Login', route: '/login' },
  { id: 2, name: 'Register', route: '/register' },
];

const NavigationLinks = ({ linkStyle }) => {
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
      {linksData.map((item) => (
        <li>
          <Button color="inherit" aria-label={item.name}>
            <Link
              component={NavLink}
              to={item.route}
              sx={{ ...defaultLinkStyle(theme), ...linkStyle }}
            >
              {item.name}
            </Link>
          </Button>
        </li>
      ))}
    </Box>
  );
};

const defaultLinkStyle = (theme) => ({
  color: theme.palette.primary.contrastText,
});

export default NavigationLinks;
