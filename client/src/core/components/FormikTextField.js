import React from 'react';
import { TextField } from '@mui/material';

const capitalizeString = (text) =>
  text.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

const FormikTextField = ({
  formik,
  required = false,
  id,
  label = capitalizeString(id),
  ...props
}) => {
  return (
    <TextField
      variant="standard"
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={id}
      value={formik.values[id]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={
        formik.errors[id] && formik.touched[id] ? formik.errors[id] : null
      }
      error={formik.errors[id] && formik.touched[id]}
      {...props}
    />
  );
};

export default FormikTextField;
