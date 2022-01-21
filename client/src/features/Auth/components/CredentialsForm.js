import React from 'react';
import { useFormik } from 'formik';
import { CircularProgress, Box } from '@mui/material';
import DisplayError from '../../../core/components/DisplayError';
import GradientButton from '../../../core/components/GradientButton';
import FormikTextField from '../../../core/components/FormikTextField';

const CredentialsForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  submitText,
  isError,
  error,
  isLoading,
  isSuccess,
  successComponent,
  errorComponent,
}) => {
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <form>
      <FormikTextField
        formik={formik}
        id="email"
        label="Email Address"
        autoFocus
        required
      />
      <FormikTextField
        formik={formik}
        id="password"
        type="password"
        required
        sx={{ pb: 1 }}
      />
      {isError && <DisplayError error={error} />}
      {isError && errorComponent}
      {isSuccess && successComponent}
      <Box>
        <GradientButton
          type="submit"
          onClick={formik.handleSubmit}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={20} /> : null
          }
        >
          {submitText}
        </GradientButton>
      </Box>
    </form>
  );
};

export default CredentialsForm;
