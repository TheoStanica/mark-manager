import {
  Box,
  Button,
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
import { useResetPasswordMutation } from '../../../api/auth';
import FormikTextField from '../../../core/components/FormikTextField';
import PublicNavigation from '../../../core/components/PublicNavbar';
import useErrorSnack from '../../../core/hooks/useErrorSnack';
import useQuery from '../../../core/hooks/useQuery';
import { resetPasswordSchema } from '../validation/resetPassword';

const ResetPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const query = useQuery();
  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  const formik = useFormik({
    validationSchema: resetPasswordSchema,
    initialValues: { password: '', confirmPassword: '' },
    onSubmit: async ({ password }) => {
      await resetPassword({ password, token: query.get('token') });
    },
  });
  useErrorSnack({ error });

  return (
    <>
      <PublicNavigation />
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
              {isSuccess && (
                <Typography component="p" mt={1}>
                  You password has been reset successfully
                </Typography>
              )}
              <Box>
                <Button
                  variant="contained"
                  // type="submit"
                  onClick={() => formik.handleSubmit()}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={
                    isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null
                  }
                >
                  Reset Password
                </Button>
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

const formStyle = (isSmallScreen: boolean) => ({
  p: 5,
  paddingX: isSmallScreen ? 2 : 5,
  width: { sx: 1, sm: 550 },
});
