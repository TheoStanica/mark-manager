import { useState } from 'react';

const useTheme = () => {
  const [dark, setDark] = useState(true);

  const theme = {
    palette: {
      type: 'dark',
      primary: {
        main: '#515ba4',
      },
      secondary: {
        main: '#75fac8',
      },
      background: {
        default: '#0b0f19',
        paper: '#111827',
      },
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 42,
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
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
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

  return theme;
};

export default useTheme;
