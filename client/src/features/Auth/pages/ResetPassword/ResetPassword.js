import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useResetPasswordMutation } from '../../../../api/auth/api';
import DisplayError from '../../../../core/components/DisplayErrors/DisplayError';
import GradientBackground from '../../../../core/components/GradientBackground/GradientBackground';
import GradientButton from '../../../../core/components/GradientButton/GradientButton';
import PublicNavigation from '../../../../core/components/PublicNaviagtion/PublicNavigation';
import { useQuery } from '../../../../hooks/useQuery';
import { resetPasswordSchema } from '../../validation/resetPassword';

const ResetPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const query = useQuery();
  const [
    resetPassword,
    { isLoading, isError, error, isSuccess },
  ] = useResetPasswordMutation();

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
                Create New Password
              </Typography>
            </Grid>
            <Formik
              validationSchema={resetPasswordSchema}
              initialValues={{ password: '', confirmPassword: '' }}
              onSubmit={async ({ password }) => {
                await resetPassword({ password, token: query.get('token') });
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
                    id="password"
                    label="New Password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                    error={errors.password && touched.password}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                    error={errors.confirmPassword && touched.confirmPassword}
                  />
                  {isError && <DisplayError error={error} />}
                  {isSuccess && (
                    <Typography component="p" mt={1}>
                      You password has been reset successfully
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
                      Change Password
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

export default ResetPassword;

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
