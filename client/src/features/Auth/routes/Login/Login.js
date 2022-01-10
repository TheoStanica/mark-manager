import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Link,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { credentialsSchema } from '../../validation/credentials';
import { useLoginMutation } from '../../../../api/auth/api';
import PublicNavigation from '../../../PublicNavigation/components/PublicNavigation';
import CredentialsForm from '../../components/CredentialsForm';
import GradientBackground from '../../../../core/components/GradientBackground/GradientBackground';

const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <PublicNavigation
        linkStyle={{ color: theme.palette.primary.contrastText }}
        transparent
      />
      <GradientBackground />
      <Container>
        <CssBaseline />
        <Box sx={formContainerStyle}>
          <Paper sx={formStyle(isSmallScreen)}>
            <Grid container justifyContent="center">
              <Typography component="h1" variant="h4">
                Login
              </Typography>
            </Grid>
            <CredentialsForm
              submitText="Log In"
              validationSchema={credentialsSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async ({ email, password }) => {
                await login({ email, password });
              }}
              isError={isError}
              error={error}
              isLoading={isLoading}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

const formContainerStyle = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const formStyle = (isSmallScreen) => ({
  p: 5,
  paddingX: isSmallScreen ? 2 : 5,
  width: { sx: 1, sm: 550 },
});

export default Login;
