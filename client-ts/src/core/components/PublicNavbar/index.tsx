import React from 'react';
import { Box, AppBar, Toolbar, Container, Link } from '@mui/material';
import Mark from '../../../assets/Pictures/Mark';
import { NavLink } from 'react-router-dom';
// import useApplicationTheme from '../../hooks/useApplicationTheme';
import NavigationLinks from './NavLinks';

const PublicNavigation = ({
  appBarStyle,
  appBarProps,
  toolBarStyle,
  toolBarProps,
  linkStyle,
  transparent = false,
}: any) => {
  // const { mode } = useApplicationTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        // elevation={mode === 'dark' ? 5 : 2}
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
              <Link
                component={NavLink}
                to="/"
                style={{ display: 'flex' }}
                aria-label="logo"
              >
                <Mark size={48} />
              </Link>
            </Box>
            <NavigationLinks linkStyle={linkStyle} />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

const toolBarDefaultStyle = {
  '@media (min-width: 600px)': { padding: 0 },
  padding: 0,
};

export default PublicNavigation;
