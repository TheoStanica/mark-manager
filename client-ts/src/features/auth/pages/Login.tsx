import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Link,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { credentialsSchema } from '../validation/credentials';
import CredentialsForm from '../components/CredentialsForm';
import { NavLink } from 'react-router-dom';
import ResendActivation from '../components/ResendActivation';
import PublicNavigation from '../../../core/components/PublicNavbar';
import { useLoginMutation } from '../../../api/auth';
import { StyleSheet } from '../../../core/types/stylesheet';
import { isAccountNotActivatedError } from '../../../core/utils/errors';

const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [usedEmail, setUsedEmail] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <PublicNavigation />
      <Container>
        <Box sx={styles().container}>
          <Paper sx={styles(isSmallScreen).form} elevation={5}>
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
              onSubmit={async ({ email, password }: any) => {
                setUsedEmail(email);
                await login({ email, password });
              }}
              isError={isError}
              error={error}
              isLoading={isLoading}
              errorComponent={
                isAccountNotActivatedError(error) && (
                  <ResendActivation email={usedEmail} />
                )
              }
            />
            <Grid container>
              <Grid item xs>
                <Link component={NavLink} to="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={NavLink} to="/register" variant="body2">
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

export default Login;
