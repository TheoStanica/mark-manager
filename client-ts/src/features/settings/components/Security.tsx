import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useChangePasswordMutation } from '../../../api/auth';
import FormikTextField from '../../../core/components/FormikTextField';
import useErrorSnack from '../../../core/hooks/useErrorSnack';
import { changePasswordSchema } from '../validation/changePassword';

const Security = () => {
  const [changePassword, { isLoading, error, isSuccess }] =
    useChangePasswordMutation();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    validationSchema: changePasswordSchema,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async ({ currentPassword, newPassword }) => {
      await changePassword({ currentPassword, newPassword });
    },
  });
  useErrorSnack({ error });

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
        <form>
          <FormikTextField
            formik={formik}
            id="newPassword"
            label="New Password"
            type="password"
            required
          />
          <FormikTextField
            formik={formik}
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            required
          />
          <FormikTextField
            formik={formik}
            id="currentPassword"
            label="Current Password"
            type="password"
            required
          />
          <Box>
            <Button
              variant="contained"
              onClick={() => formik.handleSubmit()}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Security;
