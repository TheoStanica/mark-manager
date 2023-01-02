import { createTheme, ThemeOptions } from '@mui/material';

export const themeConfig: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#7e84ff',
    },
    secondary: {
      main: '#75fac8',
    },
    background: {
      default: '#0b0f19',
      // default: 'white',
      paper: '#111827',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // root: {
        //   background:
        //     // 'linear-gradient(43deg, #4158D0 0%, #597fac 46%, #75fac8 100%)',
        //     // 'linear-gradient(60deg, #09d3df 0%,  #ff08f9 100%)',
        //     'linear-gradient(60deg, #7e84ff 10%,  #75fac8 90%)',
        //   border: 0,
        //   borderRadius: 3,
        //   color: 'black',
        //   height: 48,
        //   padding: '0 30px',
        //   fontWeight: 600,
        // },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },

  // why doesnt this work?
  // @ts-ignore
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
};

export const defaultTheme = createTheme(themeConfig);
