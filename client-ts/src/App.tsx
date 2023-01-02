import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store, persistor } from './core/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoute, { Props as AppRouteProps } from './core/components/AppRoute';
import Landing from './features/landing/pages';
import ErrorPage from './features/error/pages';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import { defaultTheme } from './theme';
import AppThemeProvider from './core/components/AppThemeProvider';
import { SnackbarProvider } from 'notistack';
import Dashboard from './features/dashboard/pages';
import { injectStore } from './api/index';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';

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
      // errorElement: <ErrorPage />,
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
  ]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate
          loading={<div style={{ backgroundColor: 'white' }}>Loading</div>}
          persistor={persistor}
        >
          <SnackbarProvider>
            <AppThemeProvider>
              <CssBaseline />
              <RouterProvider router={router} />
            </AppThemeProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
