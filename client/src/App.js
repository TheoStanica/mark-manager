import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
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
  );
};

export default App;
