import React from 'react';
import { Pictures } from '../../../assets/Pictures';
import {
  Box,
  Typography,
  Container,
  useTheme,
  Link,
  Button,
} from '@mui/material';
import useIsMobileScreen from '../../../core/hooks/useIsMobileScreen';
import PublicNavigation from '../../../core/components/PublicNavbar';
import useApplicationTheme from '../../../core/hooks/useApplicationTheme';
import { NavLink } from 'react-router-dom';
import { StyleSheet } from '../../../core/types/stylesheet';
import { Theme } from '@mui/system';

const Landing = () => {
  const theme = useTheme();
  const isMobile = useIsMobileScreen();
  const { mode } = useApplicationTheme();

  return (
    <>
      <PublicNavigation appBarStyle={styles({}).navigationAppBarStyle} />
      <Box sx={styles({}).section} component="section">
        <Container sx={styles({}).contentContainer} maxWidth="xl">
          <Box sx={styles({}).copyCTA}>
            <Box>
              <Typography
                sx={styles({ theme, emphasized: true }).inline}
                component="h1"
                variant="h4"
              >
                Engage
              </Typography>
              <Typography
                sx={styles({ theme }).inline}
                component="h1"
                variant="h4"
              >
                with your audience
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={styles({ theme, emphasized: true }).inline}
                component="h2"
                variant="h5"
                mt={1}
              >
                All
              </Typography>
              <Typography
                sx={styles({ theme }).inline}
                component="h2"
                variant="h5"
              >
                accounts.
              </Typography>
              <Typography
                sx={styles({ theme, emphasized: true }).inline}
                component="h2"
                variant="h5"
                mt={1}
              >
                One
              </Typography>
              <Typography
                sx={styles({ theme }).inline}
                component="h2"
                variant="h5"
              >
                place.
              </Typography>
            </Box>
            <Button aria-label="register" variant="contained" sx={{ mt: 4 }}>
              <Link
                component={NavLink}
                to={'/register'}
                sx={{ color: 'white' }}
              >
                Register
              </Link>
            </Button>
          </Box>
          <Box sx={styles({ isMobile }).copyCTAImage}>
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
      <Box sx={styles({}).section} component="section">
        <Container sx={styles({}).contentContainer} maxWidth="xl">
          <Box sx={{ ...styles({ isMobile }).copyCTAImage, width: '38%' }}>
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
          <Box sx={{ ...styles({}).copyCTA, pl: isMobile ? 0 : 8 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={styles({ theme }).inline}
            >
              Find what your customers really think
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              sx={{ ...styles({ theme }).inline, mt: 3 }}
            >
              Keep an eye on the latest social conversations, trends and brand
              mentions. Quickly respond to comments for all your connected
              accounts
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={styles({}).section} component="section">
        <Container sx={styles({}).contentContainer} maxWidth="xl">
          <Box sx={styles({}).copyCTA}>
            <Typography
              component="h1"
              variant="h4"
              sx={styles({ theme }).inline}
            >
              Connect all your social networks and never miss an event
            </Typography>
            <Button aria-label="register" variant="contained" sx={{ mt: 4 }}>
              <Link
                component={NavLink}
                to={'/register'}
                sx={{ color: 'white' }}
              >
                Register
              </Link>
            </Button>
          </Box>
          <Box sx={styles({ isMobile }).copyCTAImage}>
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

interface StyleProps {
  theme?: Theme;
  emphasized?: boolean;
  isMobile?: boolean;
}

const styles = ({ theme, emphasized, isMobile }: StyleProps): StyleSheet => ({
  inline: {
    display: 'inline-block',
    marginRight: theme?.spacing(1),
    color: emphasized ? theme?.palette.primary.main : 'inherit',
    fontWeight: emphasized ? 600 : 'inherit',
  },
  navigationAppBarStyle: {
    position: 'absolute',
  },
  section: {
    display: 'flex',
    minHeight: '100vh',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  copyCTA: {
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  copyCTAImage: {
    width: '40vw',
    display: isMobile ? 'none' : 'flex',
  },
});

export default Landing;
