import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  FormHelperText,
  TextField,
} from '@mui/material';
import GradientButton from '../../../core/components/GradientButton';
import UploadAvatar from './UploadAvatar';
import {
  useCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../api/user/api';
import { Formik } from 'formik';
import { accountInfoSchema } from '../validation/accountInfo';
import { useSnackbar } from 'notistack';

const AccountInfoForm = () => {
  const { data } = useCurrentUserQuery();
  const [
    updateUser,
    { isLoading, isError, isSuccess },
  ] = useUpdateUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Account updated', { variant: 'success' });
    }
    if (isError) {
      enqueueSnackbar('Something went wrong. Please try again later', {
        variant: 'error',
      });
    }
  }, [isSuccess, isError, enqueueSnackbar]);

  return (
    <form>
      <Box sx={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
        <Formik
          validationSchema={accountInfoSchema}
          initialValues={{
            email: data?.user?.email || '',
            name: data?.user?.fullName || '',
            avatar: null,
          }}
          enableReinitialize={true}
          onSubmit={async ({ email, name, avatar }) => {
            await updateUser({ email, fullName: name, profilePicture: avatar });
          }}
        >
          {({
            handleBlur,
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
          }) => (
            <>
              <Box sx={{ flexGrow: 3 }}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name ? errors.name : null}
                  error={errors.name && touched.name}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
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
                    Save changes
                  </GradientButton>
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <UploadAvatar
                  onImageUploaded={(file) => setFieldValue('avatar', file)}
                />
                <FormHelperText error>{errors.avatar}</FormHelperText>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </form>
  );
};

export default AccountInfoForm;
