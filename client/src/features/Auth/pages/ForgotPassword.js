import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useResetPasswordRequestMutation } from '../../../api/auth/api';
import GradientBackground from '../../../core/components/GradientBackground';
import GradientButton from '../../../core/components/GradientButton';
import PublicNavigation from '../../../core/components/PublicNavigation';
import { emailSchema } from '../validation/email';
import DisplayError from '../../../core/components/DisplayError';

const ForgotPassword = () => {
  const theme = useTheme();
  const [
    resetPasswordRequest,
    { isLoading, isSuccess, isError, error },
  ] = useResetPasswordRequestMutation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                Reset Password
              </Typography>
            </Grid>
            <Formik
              validationSchema={emailSchema}
              initialValues={{ email: '' }}
              onSubmit={async ({ email }) => {
                await resetPasswordRequest({ email });
              }}
            >
              {({
                handleBlur,
                values,
                handleChange,
                errors,
                touched,
                handleSubmit,
              }) => (
                <form>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    error={errors.email && touched.email}
                  />
                  {isError && <DisplayError error={error} />}
                  {isSuccess && (
                    <Typography component="p" mt={1}>
                      Request sent! Please check your email for further
                      instructions.
                    </Typography>
                  )}
                  <Box>
                    <GradientButton
                      type="submit"
                      onClick={handleSubmit}
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                      startIcon={
                        isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null
                      }
                    >
                      Reset Password
                    </GradientButton>
                  </Box>
                </form>
              )}
            </Formik>
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

export default ForgotPassword;
