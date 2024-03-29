import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useChangeThemeMutation,
  useCurrentUserQuery,
} from '../../api/user/index';
import { AppState } from '../redux/store';

export type ThemeModes = 'dark' | 'light';

export interface IThemeContext {
  mode: ThemeModes;
  toggleTheme: () => Promise<void>;
}

export const ThemeContext = createContext<IThemeContext>({
  mode: 'light',
  toggleTheme: async () => {},
});

const getSelectedTheme = (data: any) => {
  if (data?.user?.themePreference) return data?.user?.themePreference;
  const localstorageTheme = localStorage.getItem('theme');
  if (localstorageTheme) return localstorageTheme;
  // browser theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const AppThemeProvider = ({ children }: any) => {
  const { accessToken } = useSelector((state: AppState) => state.authSlice);
  const { data } = useCurrentUserQuery(undefined, { skip: !accessToken });
  const [selectedTheme, setSelectedTheme] = useState(getSelectedTheme(data));
  const [theme, setTheme] = useState<ThemeOptions>(defaultTheme);
  const [changeTheme, { isLoading, isError }] = useChangeThemeMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const userTheme = data?.user?.themePreference;
    if (userTheme) {
      setSelectedTheme(userTheme);
      localStorage.setItem('theme', userTheme);
    }
  }, [data]);

  const toggleTheme = async () => {
    const theme = selectedTheme === 'light' ? 'dark' : 'light';
    if (accessToken) {
      if (!isLoading) {
        await changeTheme({ themePreference: theme });
      }
    } else {
      setSelectedTheme(theme);
      localStorage.setItem('theme', theme);
    }
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`We couldn't update the theme. Please try again later `, {
        variant: 'error',
      });
    }
  }, [isError, enqueueSnackbar]);

  useEffect(() => {
    setTheme({
      palette: {
        mode: selectedTheme,
        primary: { main: '#5865f2' },
        // primary: {
        //   main: selectedTheme === 'dark' ? '#A3A7FF' : '#494EB0',
        //   contrastText:
        //     selectedTheme === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
        // },
        // secondary: {
        //   main: '#75fac8',
        // },
        // background: {
        //   default: selectedTheme === 'dark' ? '#0b0f19' : 'rgb(229, 232, 237)',
        //   paper: selectedTheme === 'dark' ? '#111827' : 'white',
        // },
      },
      components: {
        //
        MuiButton: {
          styleOverrides: {
            root: {
              // background:
              //   // 'linear-gradient(43deg, #4158D0 0%, #597fac 46%, #75fac8 100%)',
              //   // 'linear-gradient(60deg, #09d3df 0%,  #ff08f9 100%)',
              //   'linear-gradient(60deg, #7e84ff 10%,  #75fac8 90%)',
              // border: 0,
              // borderRadius: 3,
              // color: 'black',
              // height: 48,
              // padding: '0 30px',
              // fontWeight: 600,
            },
          },
        },
        //
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
    });
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ mode: selectedTheme, toggleTheme }}>
      <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;

const defaultTheme: ThemeOptions = {
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
    MuiButton: {
      styleOverrides: {
        root: {
          background:
            // 'linear-gradient(43deg, #4158D0 0%, #597fac 46%, #75fac8 100%)',
            // 'linear-gradient(60deg, #09d3df 0%,  #ff08f9 100%)',
            'linear-gradient(60deg, #7e84ff 10%,  #75fac8 90%)',
          border: 0,
          borderRadius: 3,
          color: 'black',
          height: 48,
          padding: '0 30px',
          fontWeight: 600,
        },
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
  // components: {
  //   MuiSwitch: {
  //     styleOverrides: {
  //       root: {
  //         width: 46,
  //         height: 26,
  //         padding: 0,
  //         margin: 8,
  //       },
  //       switchBase: {
  //         padding: 1,
  //         '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
  //           transform: 'translateX(16px)',
  //           color: '#fff',
  //           '& + $track': {
  //             opacity: 1,
  //             border: 'none',
  //           },
  //         },
  //       },
  //       thumb: {
  //         width: 24,
  //         height: 24,
  //       },
  //       track: {
  //         borderRadius: 13,
  //         backgroundColor: '#fafafa',
  //         opacity: 1,
  //         transition:
  //           'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  //       },
  //     },
  //   },
  // },
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
