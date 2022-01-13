import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const AppThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setTheme({
      palette: {
        mode: selectedTheme,
        primary: {
          main: selectedTheme === 'dark' ? '#A3A7FF' : '#494EB0',
          contrastText:
            selectedTheme === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
        },
        secondary: {
          main: '#75fac8',
        },
        background: {
          default: selectedTheme === 'dark' ? '#0b0f19' : '#fafafa',
          paper: selectedTheme === 'dark' ? '#111827' : 'white',
        },
      },
      components: {
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
    });
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ mode: selectedTheme, toggleTheme }}>
      <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;

const defaultTheme = {
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
      paper: '#111827',
    },
  },
  components: {
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
