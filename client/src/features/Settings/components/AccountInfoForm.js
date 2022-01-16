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
  useUploadImageMutation,
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
  const [
    uploadImage,
    { isError: isImageError, isLoading: isImageLoading },
  ] = useUploadImageMutation();
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
    if (isImageError) {
      enqueueSnackbar(
        `We couldn't upload your profile picture. Please try again later`,
        {
          variant: 'error',
        }
      );
    }
  }, [isSuccess, isError, isImageError, enqueueSnackbar]);

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
            let imageUrl = null;
            try {
              if (avatar) {
                const image = new FormData();
                image.append('image', avatar);
                const imageResult = await uploadImage({
                  image,
                }).unwrap();
                imageUrl = imageResult.imageUrl;
              }
              await updateUser({
                email,
                fullName: name,
                profilePicture: imageUrl,
              });
            } catch {}
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
                      isLoading || isImageLoading ? (
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
