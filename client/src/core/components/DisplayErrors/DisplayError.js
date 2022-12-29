import { FormHelperText, Box } from '@mui/material';
import React from 'react';

const DisplayError = ({ error }) => {
  return (
    error && (
      <Box>
        {error.data.errors.map((error, index) => (
          <FormHelperText error key={index}>
            {error.message}
          </FormHelperText>
        ))}
      </Box>
    )
  );
};

export default DisplayError;
