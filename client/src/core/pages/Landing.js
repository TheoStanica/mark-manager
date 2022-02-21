import React from 'react';
import { useHistory } from 'react-router-dom';
import { Pictures } from '../../assets/Pictures';
import useApplicationTheme from '../hooks/useApplicationTheme';
import PublicNavigation from '../components/PublicNavigation/PublicNavigation';
import GradientButton from '../components/GradientButton';
import GradientBackground from '../components/GradientBackground';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  useTheme,
} from '@mui/material';
import useIsMobileScreen from '../hooks/useIsMobileScreen';

const Landing = () => {
  const theme = useTheme();
  const isMobile = useIsMobileScreen();

  const history = useHistory();
  const { mode } = useApplicationTheme();

  return (
    <>
      <PublicNavigation appBarStyle={navigationAppBarStyle} transparent />
      <CssBaseline />
      <GradientBackground />
      <Box container sx={sectionStyle} component="section">
        <Container sx={contentContainerStyle} maxWidth="xl">
          <Box sx={copyCTAStyle}>
            <Box>
              <Typography {...copyH1Props} sx={inlineStyle(theme, true, mode)}>
                Engage
              </Typography>
              <Typography {...copyH1Props} sx={inlineStyle(theme)}>
                with your audience
              </Typography>
            </Box>
            <Box>
              <Typography
                {...copyH2Props}
                sx={inlineStyle(theme, true, mode)}
                mt={1}
              >
                All
              </Typography>
              <Typography {...copyH2Props} sx={inlineStyle(theme)}>
                accounts.
              </Typography>
              <Typography
                {...copyH2Props}
                sx={inlineStyle(theme, true, mode)}
                mt={1}
              >
                One
              </Typography>
              <Typography {...copyH2Props} sx={inlineStyle(theme)}>
                place.
              </Typography>
            </Box>
            <GradientButton
              sx={{ mt: 4 }}
              onClick={() => history.push('/register')}
            >
              Register now
            </GradientButton>
          </Box>
          <Box sx={copyCTAImageStyle(isMobile)}>
            <img
              style={{ width: '100%' }}
              src={
                mode === 'dark' ? Pictures.EngageNew : Pictures.EngageNewLight
              }
              alt="Engage with your audience"
            />
          </Box>
        </Container>
      </Box>
      <Box container sx={sectionStyle} component="section">
        <Container sx={contentContainerStyle} maxWidth="xl">
          <Box sx={{ ...copyCTAImageStyle(isMobile), width: '38%' }}>
            <img
              style={{ width: '100%' }}
              src={
                mode === 'dark'
                  ? Pictures.OpinionsNew
                  : Pictures.OpinionsNewLight
              }
              alt="Find what your customers really think"
            />
          </Box>
          <Box sx={{ ...copyCTAStyle, pl: isMobile ? 0 : 8 }}>
            <Typography {...copyH1Props} sx={inlineStyle(theme)}>
              Find what your customers really think
            </Typography>
            <Typography {...copyH2Props} sx={{ ...inlineStyle(theme), mt: 3 }}>
              Keep an eye on the latest social conversations, trends and brand
              mentions. Quickly respond to comments for all your connected
              accounts
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box container sx={sectionStyle} component="section">
        <Container sx={contentContainerStyle} maxWidth="xl">
          <Box sx={copyCTAStyle}>
            <Typography {...copyH1Props} sx={inlineStyle(theme)}>
              Connect all your social networks and never miss an event
            </Typography>
            <GradientButton
              sx={{ mt: 4 }}
              onClick={() => history.push('/register')}
            >
              Register now
            </GradientButton>
          </Box>
          <Box sx={copyCTAImageStyle(isMobile)}>
            <img
              style={{ width: '100%' }}
              src={
                mode === 'dark'
                  ? Pictures.ConnectAccountsNew
                  : Pictures.ConnectAccountsNewLight
              }
              alt="Find what your customers really think"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

const inlineStyle = (theme, emphasized, mode) => ({
  display: 'inline-block',
  mr: 1,
  color: emphasized ? getColorMatchingThemeMode(mode, theme) : 'inherit',
  fontWeight: emphasized ? 600 : 'inherit',
});

const getColorMatchingThemeMode = (mode, theme) => {
  return mode === 'dark'
    ? theme.palette.secondary.main
    : theme.palette.primary.main;
};

const navigationAppBarStyle = {
  position: 'absolute',
};

const sectionStyle = { display: 'flex', minHeight: '100vh' };

const contentContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const copyCTAStyle = {
  flex: 1,
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'baseline',
};

const copyCTAImageStyle = (isMobile) => ({
  width: '40vw',
  display: isMobile ? 'none' : 'flex',
});

const copyH1Props = {
  component: 'h1',
  variant: 'h4',
};
const copyH2Props = {
  component: 'h2',
  variant: 'h5',
};

export default Landing;
