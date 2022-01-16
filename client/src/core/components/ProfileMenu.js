import React, { useState } from 'react';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { useCurrentUserQuery } from '../../api/user/api';
import { useLogoutMutation } from '../../api/auth/api';
import useApplicationTheme from '../hooks/useApplicationTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useHistory } from 'react-router-dom';

const ProfileMenu = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const { data } = useCurrentUserQuery();
  const [logout] = useLogoutMutation();
  const { mode, toggleTheme } = useApplicationTheme();
  const history = useHistory();

  const handleOpenUserMenu = (e) => {
    e.stopPropagation();
    setAnchorElement(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          alt={`${data?.user?.fullName}'s profile`}
          src={data?.user?.profilePicture}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElement)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => history.push('/settings')}>
          <Box mr={1}>
            <SettingsIcon sx={{ verticalAlign: 'middle' }} />
          </Box>
          <Typography textAlign="center">My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={toggleTheme}>
          <Box mr={1}>
            {mode === 'dark' ? (
              <DarkModeIcon sx={{ verticalAlign: 'middle' }} />
            ) : (
              <LightModeIcon sx={{ verticalAlign: 'middle' }} />
            )}
          </Box>
          <Typography textAlign="center" sx={{ textTransform: 'capitalize' }}>
            Theme: {mode}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <Box mr={1}>
            <LogoutIcon sx={{ verticalAlign: 'middle' }} />
          </Box>
          <Typography textAlign="center">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
