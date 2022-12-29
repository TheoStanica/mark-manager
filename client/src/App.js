import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './shared/redux/store';
import { Switch } from 'react-router-dom';
import Login from './features/Auth/pages/Login';
import Landing from './core/pages/Landing';
import { injectStore } from './api/apiBaseQuery';
import ApplicationRoute from './features/Auth/components/PrivateRoute';
// import Dashboard from '../src/pages/Dashboard/Dashboard';
import Register from './features/Auth/pages/Register';
import AppThemeProvider from './core/components/AppThemeProvider';
import ForgotPassword from './features/Auth/pages/ForgotPassword';
import Activate from './features/Auth/pages/Activate';
import ResetPassword from './features/Auth/pages/ResetPassword';
import Dashboard from './features/Dashboard/pages/Dashboard';
import Settings from './features/Settings/pages/Settings';
import { SnackbarProvider } from 'notistack';
import Planner from './features/Planner/pages/Planner';
import TwitterConnect from './features/ConnectSocialAccount/pages/TwitterConnect';
import { CssBaseline } from '@mui/material';
import ScrollTriggerProvider from './core/components/ScrollTriggerProvider/ScrollTriggerProvider';
=======
// import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/Navigation';
import { StyledFullPage } from './styles';
import { persistor, store } from './shared/redux/store';
import { Route, Switch } from 'react-router-dom';
import Login from './features/Auth/routes/Login/Login';
import Landing from './features/Landing/routes/Landing/Landing';
import { injectStore } from './api/apiBaseQuery';
import ApplicationRoute from './features/Auth/components/PrivateRoute';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { createTheme, ThemeProvider } from '@mui/material';
import useTheme from './core/hooks/useTheme';
import { createMuiTheme } from '@material-ui/core';
import Register from './features/Auth/routes/Register/Register';
>>>>>>> fe04bfb (aa)

injectStore(store);

const App = () => {
  // const theme = useTheme();
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
        // default: 'white',
        paper: '#111827',
      },
    },
    components: {
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       background:
      //         // 'linear-gradient(43deg, #4158D0 0%, #597fac 46%, #75fac8 100%)',
      //         // 'linear-gradient(60deg, #09d3df 0%,  #ff08f9 100%)',
      //         'linear-gradient(60deg, #7e84ff 10%,  #75fac8 90%)',
      //       border: 0,
      //       borderRadius: 3,
      //       color: 'black',
      //       height: 48,
      //       padding: '0 30px',
      //       fontWeight: 600,
      //     },
      //   },
      // },
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

  // const testtheme = createMuiTheme(defaultTheme);

  const testtheme = createTheme(defaultTheme);

  return (
<<<<<<< HEAD
    <Provider store={store}>
      <PersistGate loading={<div>Loading</div>} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
          <AppThemeProvider>
            <ScrollTriggerProvider>
              <CssBaseline enableColorScheme />
              <Router>
                <Switch>
                  <ApplicationRoute path="/" exact onlyPublic>
                    <Landing />
                  </ApplicationRoute>
                  <ApplicationRoute path="/login" exact onlyPublic>
                    <Login />
                  </ApplicationRoute>
                  <ApplicationRoute path="/register" exact onlyPublic>
                    <Register />
                  </ApplicationRoute>
                  <ApplicationRoute
                    path="/activate/:activationToken"
                    exact
                    onlyPublic
                  >
                    <Activate />
                  </ApplicationRoute>
                  <ApplicationRoute path="/forgotPassword" exact onlyPublic>
                    <ForgotPassword />
                  </ApplicationRoute>
                  <ApplicationRoute path="/password/reset" exact onlyPublic>
                    <ResetPassword />
                  </ApplicationRoute>

                  <ApplicationRoute path="/dashboard" exact>
                    <Dashboard />
                  </ApplicationRoute>
                  <ApplicationRoute path="/settings" exact>
                    <Settings />
                  </ApplicationRoute>
                  <ApplicationRoute path="/planner" exact>
                    <Planner />
                  </ApplicationRoute>
                  <ApplicationRoute path="/twitter/connect" exact>
                    <TwitterConnect />
                  </ApplicationRoute>
                </Switch>
              </Router>
            </ScrollTriggerProvider>
          </AppThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
=======
    <ThemeProvider theme={testtheme}>
      <Provider store={store}>
        <PersistGate
          loading={<div style={{ backgroundColor: 'red' }}>Loading</div>}
          persistor={persistor}
        >
          <Router>
            <Switch>
              {/* <StyledFullPage> */}
              <ApplicationRoute path="/" exact onlyPublic>
                <Landing />
              </ApplicationRoute>
              <ApplicationRoute path="/login" exact onlyPublic>
                <Login />
              </ApplicationRoute>
              <ApplicationRoute path="/register" exact onlyPublic>
                <Register />
                {/* <RegisterPage /> */}
              </ApplicationRoute>
              <ApplicationRoute path="/dashboard" exact>
                <Dashboard />
              </ApplicationRoute>
              {/* </StyledFullPage> */}
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
>>>>>>> fe04bfb (aa)
  );
};

export default App;
