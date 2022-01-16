import { FormHelperText, Box, Typography } from '@mui/material';
import React from 'react';

const DisplayError = ({ error, simple }) => {
  return (
    error && (
      <Box>
        {error.data.errors.map((error, index) => {
          return !simple ? (
            <FormHelperText error key={index}>
              {error.message}
            </FormHelperText>
          ) : (
            <Typography key={index}> {error.message}</Typography>
          );
        })}
      </Box>
    )
  );
};

export default DisplayError;
