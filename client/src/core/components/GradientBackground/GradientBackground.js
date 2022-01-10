import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const GradientBackground = () => {
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <Box sx={gradientBackgroundStyle(isLowerSizeScreen)}></Box>;
};

const gradient =
  'radial-gradient(at 100% 100%, hsla(238,32%,15%,1) 0, transparent 40%), radial-gradient(at 18% 23%, hsla(240,30%,4%,1) 0, transparent 100%), radial-gradient(at 94% 4%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 56% 91%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 94% 44%, hsla(238,37%,53%,1) 0, transparent 58%), radial-gradient(at 59% 1%, hsla(238,37%,53%,1) 0, transparent 82%);';

const gradientBackgroundStyle = (isLowerSizeScreen) => ({
  position: 'fixed',
  minHeight: '100vh',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundColor: '#0b0f19',
  background: gradient,
  animation: isLowerSizeScreen
    ? 'none'
    : 'bg-animation 25s ease-in-out infinite',

  '@keyframes bg-animation': {
    '0%': { backgroundSize: '100% 100%' },
    '50%': { backgroundSize: '170% 120%', backgroundPosition: ' top left' },
    '100%': { backgroundSize: '100% 100% ' },
  },
});

export default GradientBackground;
