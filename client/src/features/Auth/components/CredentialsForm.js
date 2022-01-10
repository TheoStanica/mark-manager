import React from 'react';
import { Formik } from 'formik';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';
import DisplayError from '../../../core/components/DisplayErrors/DisplayError';
import GradientButton from '../../../core/components/GradientButton/GradientButton';

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
          {isError && errorComponent}
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
  );
};

export default CredentialsForm;
