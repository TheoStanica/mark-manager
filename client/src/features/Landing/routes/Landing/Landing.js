import React from 'react';
import { useHistory } from 'react-router-dom';
import PublicNavigation from '../../../PublicNavigation/components/PublicNavigation';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import GradientButton from '../../../../core/components/GradientButton/GradientButton';
import { Pictures } from '../../../../assets/Pictures';

const Landing = () => {
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();

  return (
    <>
      <PublicNavigation
        appBarProps={{ color: 'transparent', sx: { position: 'absolute' } }}
        linkStyle={{ color: theme.palette.primary.contrastText }}
      />
      <CssBaseline />
      <Box container sx={gradientBackgroundStyle} component="section">
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
          <Box sx={copCTAImageStyle(isLowerSizeScreen)}>
            <img
              style={{ width: '100%' }}
              src={Pictures.EngageNew}
              alt="Engage with your audience"
            />
          </Box>
        </Container>
      </Box>
      {/* <Box container sx={gradientBackgroundStyle} component="section"></Box> */}
    </>
  );
};

const inlineStyle = (theme, emphasized) => ({
  display: 'inline-block',
  mr: 1,
  color: emphasized ? theme.palette.secondary.main : 'inherit',
  fontWeight: emphasized ? 600 : 'inherit',
});

const gradient1 =
  'radial-gradient(at 4% 2%, hsla(0,0%,0%,1) 0, transparent 64%), radial-gradient(at 99% 1%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 66% 100%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 99% 71%, hsla(238,37%,53%,1) 0, transparent 43%), radial-gradient(at 63% 11%, hsla(238,37%,53%,1) 0, transparent 82%)';

const gradient2 =
  'radial-gradient(at 97% 78%, hsla(238,37%,53%,1) 0, transparent 43%), radial-gradient(at 20% 23%, hsla(223,39%,8%,1) 0, transparent 73%), radial-gradient(at 59% 100%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 98% 3%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 89% 14%, hsla(238,37%,53%,1) 0, transparent 82%)';

const gradient3 =
  'radial-gradient(at 90% 20%, hsla(228,97%,71%,1) 0, transparent 52%), radial-gradient(at 59% 85%, hsla(177,78%,67%,1) 0, transparent 57%), radial-gradient(at 82% 42%, hsla(124,66%,72%,1) 0, transparent 49%), radial-gradient(at 44% 6%, hsla(239,65%,75%,1) 0, transparent 47%), radial-gradient(at 33% 30%, hsla(255,98%,66%,1) 0, transparent 55%);';

const gradient4 =
  'radial-gradient(at 100% 100%, hsla(238,32%,15%,1) 0, transparent 40%), radial-gradient(at 18% 23%, hsla(240,30%,4%,1) 0, transparent 100%), radial-gradient(at 94% 4%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 56% 91%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 94% 44%, hsla(238,37%,53%,1) 0, transparent 58%), radial-gradient(at 59% 1%, hsla(238,37%,53%,1) 0, transparent 82%);';

const gradientBackgroundStyle = {
  backgroundColor: '#0b0f19',
  // backgroundImage:
  //   'radial-gradient(at 97% 78%, hsla(238,37%,53%,1) 0, transparent 43%), radial-gradient(at 20% 23%, hsla(223,39%,8%,1) 0, transparent 73%), radial-gradient(at 59% 100%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 98% 3%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 89% 14%, hsla(238,37%,53%,1) 0, transparent 82%)',
  // // backgroundColor: '#000000',
  // backgroundImage: 'linear-gradient(90deg, #ee6352, purple, #ee6352)',

  // backgroundImage:
  //   'radial-gradient(at 4% 2%, hsla(0,0%,0%,1) 0, transparent 64%), radial-gradient(at 99% 1%, hsla(158,48%,58%,1) 0, transparent 46%), radial-gradient(at 66% 100%, hsla(238,100%,75%,1) 0, transparent 59%), radial-gradient(at 99% 71%, hsla(238,37%,53%,1) 0, transparent 43%), radial-gradient(at 63% 11%, hsla(238,37%,53%,1) 0, transparent 82%)',

  height: 'calc(100vh - 64px)',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  animation: 'bg-animation 25s ease-in-out infinite',

  // backgroundImage: 'linear-gradient(red,blue)',
  background: gradient4,
  backgroundPosition: 'bottom',

  '@keyframes bg-animation': {
    '0%': { backgroundSize: '100% 100%' },
    '50%': { backgroundSize: '170% 120%', backgroundPosition: ' top left' },
    '100%': { backgroundSize: '100% 100% ' },
  },
};

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

const copCTAImageStyle = (isLowerSizeScreen) => ({
  width: '45vw',
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

export default Landing;
