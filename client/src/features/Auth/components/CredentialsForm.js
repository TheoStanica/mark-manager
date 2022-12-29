import React from 'react';
<<<<<<< HEAD
import { useFormik } from 'formik';
import { CircularProgress, Box } from '@mui/material';
import DisplayError from '../../../core/components/DisplayError';
import GradientButton from '../../../core/components/GradientButton';
import FormikTextField from '../../../core/components/FormikTextField';
=======
import { Formik } from 'formik';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';
import DisplayError from '../../../core/components/DisplayErrors/DisplayError';
import GradientButton from '../../../core/components/GradientButton/GradientButton';
>>>>>>> fe04bfb (aa)

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
<<<<<<< HEAD
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
=======
}) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
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
            autoFocus
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email && touched.email ? errors.email : null}
            error={errors.email && touched.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
            variant="standard"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            error={errors.password && touched.password}
            sx={{ pb: 1 }}
          />
          {isError && <DisplayError error={error} />}
          {isSuccess && successComponent}
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
              {submitText}
            </GradientButton>
          </Box>
        </form>
      )}
    </Formik>
>>>>>>> fe04bfb (aa)
  );
};

export default CredentialsForm;
