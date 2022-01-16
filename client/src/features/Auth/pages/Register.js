import React, { useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { credentialsSchema } from '../validation/credentials';
import { useRegisterMutation } from '../../../api/auth/api';
import CredentialsForm from '../components/CredentialsForm';
import GradientBackground from '../../../core/components/GradientBackground/GradientBackground';
import ResendActivation from '../components/ResendActivation';
import PublicNavigation from '../../../core/components/PublicNaviagtion/PublicNavigation';

const Register = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [usedEmail, setUsedEmail] = useState('');
  const [
    register,
    { isLoading, isError, error, isSuccess },
  ] = useRegisterMutation();

  return (
    <>
      <PublicNavigation transparent />
      <GradientBackground />
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
                setUsedEmail(email);
                await register({ email, password });
              }}
              isError={isError}
              error={error}
              isLoading={isLoading}
              isSuccess={isSuccess}
              successComponent={
                <>
                  <Typography component="p">
                    Account created! Please check your email to activate your
                    account.
                  </Typography>
                  <ResendActivation email={usedEmail} sx={{ mt: 2 }} />
                </>
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
