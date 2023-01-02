import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import PublicNavigation from '../../../core/components/PublicNavbar';
import { emailSchema } from '../validation/email';
import FormikTextField from '../../../core/components/FormikTextField';
import { useResetPasswordRequestMutation } from '../../../api/auth';
import useErrorSnack from '../../../core/hooks/useErrorSnack';
import Success from '../../../core/components/FetchStatus/Success';

const ForgotPassword = () => {
  const theme = useTheme();
  const [resetPasswordRequest, { isLoading, isSuccess, error }] =
    useResetPasswordRequestMutation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const formik = useFormik({
    validationSchema: emailSchema,
    initialValues: { email: '' },
    onSubmit: async ({ email }: any) => {
      await resetPasswordRequest({ email });
    },
  });
  useErrorSnack({ error });

  return (
    <>
      <PublicNavigation />
      <Container>
        <CssBaseline />
        <Box sx={formContainerStyle}>
          <Paper sx={formStyle(isSmallScreen)} elevation={5}>
            <Grid container justifyContent="center">
              <Typography component="h1" variant="h4">
                Reset Password
              </Typography>
            </Grid>
            <form>
              <FormikTextField
                formik={formik}
                id="email"
                label="Email Address"
                required
              />
              {isSuccess && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Success noMessage style={{ width: 48 }} />
                  <Typography component="p" mt={1}>
                    Request sent! Please check your email for further
                    instructions.
                  </Typography>
                </Box>
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

export default ForgotPassword;
