import {
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useChangePasswordMutation } from '../../../api/auth/api';
import DisplayError from '../../../core/components/DisplayError';
import GradientButton from '../../../core/components/GradientButton';
import { changePasswordSchema } from '../validation/changePassword';

const Security = () => {
  const [
    changePassword,
    { isLoading, isError, error, isSuccess },
  ] = useChangePasswordMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Password changed', { variant: 'success' });
    }
  }, [isSuccess, enqueueSnackbar]);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" mb={2}>
          Change Password
        </Typography>
        <Formik
          validationSchema={changePasswordSchema}
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={async ({ currentPassword, newPassword }) => {
            await changePassword({ currentPassword, newPassword });
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
                id="newPassword"
                label="New Password"
                type="password"
                name="newPassword"
                autoComplete="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : null
                }
                error={errors.newPassword && touched.newPassword}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                autoComplete="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? errors.confirmNewPassword
                    : null
                }
                error={errors.confirmNewPassword && touched.confirmNewPassword}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="currentPassword"
                label="Current Password"
                type="password"
                name="currentPassword"
                autoComplete="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.currentPassword && touched.currentPassword
                    ? errors.currentPassword
                    : null
                }
                error={errors.currentPassword && touched.currentPassword}
              />
              {isError && <DisplayError error={error} />}
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
    </Container>
  );
};

export default Security;
