import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from './core/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoute, { Props as AppRouteProps } from './core/components/AppRoute';
import Landing from './features/landing/pages';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import { defaultTheme } from './theme';
import AppThemeProvider from './core/components/AppThemeProvider';
import { SnackbarProvider } from 'notistack';
import Dashboard from './features/dashboard/pages';
import { injectStore } from './api/index';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import Activate from './features/auth/pages/Activate';
import TwitterConnect from './features/conntectSocial/pages/TwitterConnect';
import Settings from './features/settings/pages';
import ScrollTriggerProvider from './core/components/ScrollTriggerProvider';
import Planner from './features/planner/pages';

injectStore(store);

type createRouteProps = Omit<AppRouteProps, 'children'>;

function App() {
  const createRoute = (element: JSX.Element, props?: createRouteProps) => {
    return <AppRoute {...props}>{element}</AppRoute>;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: createRoute(<Landing />, { onlyPublic: true }),
    },
    {
      path: '/login',
      element: createRoute(<Login />, { onlyPublic: true }),
    },
    {
      path: '/register',
      element: createRoute(<Register />, { onlyPublic: true }),
    },
    {
      path: '/activate/:activationToken',
      element: createRoute(<Activate />, { onlyPublic: true }),
    },
    {
      path: '/forgotPassword',
      element: createRoute(<ForgotPassword />, { onlyPublic: true }),
    },
    {
      path: '/password/reset',
      element: createRoute(<ResetPassword />, { onlyPublic: true }),
    },
    {
      path: '/dashboard',
      element: createRoute(<Dashboard />, { onlyPublic: false }),
    },
    {
      path: '/planner',
      element: createRoute(<Planner />, { onlyPublic: false }),
    },
    {
      path: '/twitter/connect',
      element: createRoute(<TwitterConnect />, { onlyPublic: false }),
    },
    {
      path: '/settings',
      element: createRoute(<Settings />, { onlyPublic: false }),
    },
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate
          loading={<div style={{ backgroundColor: 'white' }}>Loading</div>}
          persistor={persistor}
        >
          <SnackbarProvider>
            <ScrollTriggerProvider>
              <AppThemeProvider>
                <CssBaseline />
                <RouterProvider router={router} />
              </AppThemeProvider>
            </ScrollTriggerProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
