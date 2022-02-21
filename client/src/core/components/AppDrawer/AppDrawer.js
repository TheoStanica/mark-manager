import React, { useState } from 'react';
import {
  useTheme,
  Box,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  styled,
  List,
  Divider,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProfileMenu from '../ProfileMenu';
import DrawerItems from './DrawerItems';
import AddSocialAccount from './AddSocialAccount';
import useCustomScrollTrigger from '../../hooks/useCustomScrollTrigger';
import useIsMobileScreen from '../../hooks/useIsMobileScreen';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(0),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(7),
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppDrawer = ({ children, title }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const trigger = useCustomScrollTrigger();
  const isMobile = useIsMobileScreen();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Collapse in={!(trigger && isMobile)}>
        <AppBar position="fixed" open={open} color="inherit" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
            <Box ml="auto">
              <ProfileMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </Collapse>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { border: 'none' } }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} aria-label="close drawer">
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <AddSocialAccount />
        <Divider />
        <List>
          <DrawerItems />
        </List>
      </Drawer>
      <Box component="main" sx={main}>
        <Collapse in={!(trigger && isMobile)}>
          <DrawerHeader />
        </Collapse>
        <Box sx={container(isMobile)}>{children}</Box>
      </Box>
    </Box>
  );
};

const main = {
  overflow: 'hidden',
  width: '100%',
};

const container = (isMobile) => ({
  boxSizing: 'content-box',
  minWidth: 320,
  minHeight: `calc(100vh - ${isMobile ? 56 : 64}px)`,
  display: 'flex',
  flexDirection: 'column',
});

export default AppDrawer;
