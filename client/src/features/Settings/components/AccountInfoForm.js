import React, { useEffect } from 'react';
import { Box, CircularProgress, FormHelperText } from '@mui/material';
import GradientButton from '../../../core/components/GradientButton';
import UploadAvatar from './UploadAvatar';
import {
  useCurrentUserQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from '../../../api/user/api';
import { useFormik } from 'formik';
import { accountInfoSchema } from '../validation/accountInfo';
import { useSnackbar } from 'notistack';
import FormikTextField from '../../../core/components/FormikTextField';

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

  const formik = useFormik({
    validationSchema: accountInfoSchema,
    initialValues: {
      email: data?.user?.email || '',
      name: data?.user?.fullName || '',
      avatar: null,
    },
    enableReinitialize: true,
    onSubmit: async ({ email, name, avatar }) => {
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
    },
  });

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
        <Box sx={{ flexGrow: 3 }}>
          <FormikTextField formik={formik} id="name" />
          <FormikTextField
            formik={formik}
            id="email"
            label="Email Address"
            required
          />
          <Box>
            <GradientButton
              type="submit"
              onClick={formik.handleSubmit}
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
            onImageUploaded={(file) => formik.setFieldValue('avatar', file)}
          />
          <FormHelperText error>{formik.errors.avatar}</FormHelperText>
        </Box>
      </Box>
    </form>
  );
};

export default AccountInfoForm;
