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

const Register = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <PublicNavigation />
      <Container>
        <CssBaseline />
        <Box sx={formContainerStyle}>
          <Paper sx={formStyle(isSmallScreen)}>
            <Grid container justifyContent="center">
              <Typography component="h1" variant="h4">
                Register
              </Typography>
            </Grid>
            <CredentialsForm
              submitText="Register"
              validationSchema={credentialsSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={async ({ email, password }) => {
                // await login({ email, password });
              }}
              isError={isError}
              error={error}
              isLoading={isLoading}
              isSuccess={true}
              successComponent={
                <Typography component="p">
                  Account created! Please check your email to activate your
                  account.
                </Typography>
              }
            />
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

export default Register;
