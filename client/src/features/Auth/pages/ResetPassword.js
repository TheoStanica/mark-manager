import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useResetPasswordMutation } from '../../../api/auth/api';
import DisplayError from '../../../core/components/DisplayError';
import FormikTextField from '../../../core/components/FormikTextField';
import GradientBackground from '../../../core/components/GradientBackground';
import GradientButton from '../../../core/components/GradientButton';
import PublicNavigation from '../../../core/components/PublicNavigation/PublicNavigation';
import { useQuery } from '../../../hooks/useQuery';
import { resetPasswordSchema } from '../validation/resetPassword';

const ResetPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const query = useQuery();
  const [
    resetPassword,
    { isLoading, isError, error, isSuccess },
  ] = useResetPasswordMutation();
  const formik = useFormik({
    validationSchema: resetPasswordSchema,
    initialValues: { password: '', confirmPassword: '' },
    onSubmit: async ({ password }) => {
      await resetPassword({ password, token: query.get('token') });
    },
  });

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
            <form>
              <FormikTextField
                formik={formik}
                id="password"
                label="New Password"
                type="password"
                required
              />
              <FormikTextField
                formik={formik}
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                required
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
                  onClick={formik.handleSubmit}
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
