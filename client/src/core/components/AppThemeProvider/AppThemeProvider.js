import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCurrentUserQuery } from '../../../api/user/api';

export const ThemeContext = createContext();
const getSelectedTheme = (data) => {
  console.log(data, 'storage');
  if (data?.user?.themePreference) return data?.user?.themePreference;
  const localstorageTheme = localStorage.getItem('theme');
  console.log(localstorageTheme, 'local');
  if (localstorageTheme) return localstorageTheme;
  // browser theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const AppThemeProvider = ({ children }) => {
  const { accessToken } = useSelector((state) => state.authSlice);
  const { data } = useCurrentUserQuery(undefined, { skip: !accessToken });
  const [selectedTheme, setSelectedTheme] = useState(getSelectedTheme(data));
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const userTheme = data?.user?.themePreference;
    if (userTheme) {
      setSelectedTheme(userTheme);
      localStorage.setItem('theme', userTheme);
    }
  }, [data]);

  const toggleTheme = () => {
    const theme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme);
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
