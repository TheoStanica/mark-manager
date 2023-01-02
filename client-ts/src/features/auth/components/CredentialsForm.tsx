import React from 'react';
import { useFormik } from 'formik';
import { CircularProgress, Box, Button } from '@mui/material';
// import DisplayError from '../../../core/components/DisplayError';
// import GradientButton from '../../../core/components/GradientButton';
import FormikTextField from '../../../core/components/FormikTextField';
import useErrorSnack from '../../../core/hooks/useErrorSnack';

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
}: any) => {
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });
  useErrorSnack({ error });

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
      {/* {isError && <DisplayError error={error} />} */}
      {isError && errorComponent}
      {isSuccess && successComponent}
      <Box>
        <Button
          variant="contained"
          // type="submit"
          onClick={() => formik.handleSubmit()}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={20} /> : null
          }
        >
          {submitText}
        </Button>
      </Box>
    </form>
  );
};

export default CredentialsForm;
