import React from 'react';
import { useHistory } from 'react-router-dom';
import { Pictures } from '../../../../assets/Pictures';
import PublicNavigation from '../../../PublicNavigation/components/PublicNavigation';
import GradientButton from '../../../../core/components/GradientButton/GradientButton';
import GradientBackground from '../../../../core/components/GradientBackground/GradientBackground';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Landing = () => {
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();

  return (
    <>
      <PublicNavigation
        appBarStyle={navigationAppBarStyle}
        linkStyle={{ color: theme.palette.primary.contrastText }}
        transparent
      />
      <CssBaseline />
      <GradientBackground />
      <Box container sx={sectionStyle} component="section">
        <Container sx={contentContainerStyle} maxWidth="xl">
          <Box sx={copyCTAStyle}>
            <Box>
              <Typography {...copyH1Props} sx={inlineStyle(theme, true)}>
                Engage
              </Typography>
              <Typography {...copyH1Props} sx={inlineStyle(theme)}>
                with your audience
              </Typography>
            </Box>
            <Box>
              <Typography {...copyH2Props} sx={inlineStyle(theme, 1)} mt={1}>
                All
              </Typography>
              <Typography {...copyH2Props} sx={inlineStyle(theme)}>
                accounts.
              </Typography>
              <Typography {...copyH2Props} sx={inlineStyle(theme, 1)} mt={1}>
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
          <Box sx={copyCTAImageStyle(isLowerSizeScreen)}>
            <img
              style={{ width: '100%' }}
              src={Pictures.EngageNew}
              alt="Engage with your audience"
            />
          </Box>
        </Container>
      </Box>
      <Box container sx={sectionStyle} component="section">
        <Container sx={contentContainerStyle} maxWidth="xl">
          <Box sx={{ ...copyCTAImageStyle(isLowerSizeScreen), width: '38%' }}>
            <img
              style={{ width: '100%' }}
              src={Pictures.OpinionsNew}
              alt="Find what your customers really think"
            />
          </Box>
          <Box sx={{ ...copyCTAStyle, pl: isLowerSizeScreen ? 0 : 8 }}>
            <Typography {...copyH1Props} sx={inlineStyle(theme)}>
              Find what your customers really think
            </Typography>
            <Typography {...copyH3Props} sx={{ ...inlineStyle(theme), mt: 3 }}>
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
          <Box sx={copyCTAImageStyle(isLowerSizeScreen)}>
            <img
              style={{ width: '100%' }}
              src={Pictures.ConnectAccountsNew}
              alt="Find what your customers really think"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

const inlineStyle = (theme, emphasized) => ({
  display: 'inline-block',
  mr: 1,
  color: emphasized ? theme.palette.secondary.main : 'inherit',
  fontWeight: emphasized ? 600 : 'inherit',
});

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

const copyCTAImageStyle = (isLowerSizeScreen) => ({
  width: '40vw',
  display: isLowerSizeScreen ? 'none' : 'flex',
});

const copyH1Props = {
  component: 'h1',
  variant: 'h4',
};
const copyH2Props = {
  component: 'h2',
  variant: 'h5',
};
const copyH3Props = {
  component: 'h3',
  variant: 'body',
};

export default Landing;
