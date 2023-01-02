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
import CredentialsForm from '../components/CredentialsForm';
import ResendActivation from '../components/ResendActivation';
import PublicNavigation from '../../../core/components/PublicNavbar';
import { useRegisterMutation } from '../../../api/auth';
import { StyleSheet } from '../../../core/types/stylesheet';
import Success from '../../../core/components/FetchStatus/Success';

const Register = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [usedEmail, setUsedEmail] = useState('');
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  return (
    <>
      <PublicNavigation />
      <Container>
        <CssBaseline />
        <Box sx={styles().container}>
          <Paper sx={styles(isSmallScreen).form} elevation={5}>
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
              onSubmit={async ({ email, password }: any) => {
                setUsedEmail(email);
                await register({ email, password });
              }}
              isError={isError}
              error={error}
              isLoading={isLoading}
              isSuccess={isSuccess}
              successComponent={
                <>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Success noMessage style={{ width: 48 }} />
                    <Typography component="p">
                      Account created! Please check your email to activate your
                      account.
                    </Typography>
                  </Box>
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

const styles = (isSmallScreen?: boolean): StyleSheet => ({
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    p: 5,
    paddingX: isSmallScreen ? 2 : 5,
    width: { sx: 1, sm: 550 },
  },
});

export default Register;
