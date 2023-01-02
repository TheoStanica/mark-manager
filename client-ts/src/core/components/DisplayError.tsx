import { FormHelperText, Box, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import React from 'react';
import { ApplicationError } from '../../api';

interface Props {
  simple?: boolean;
  error: ApplicationError | SerializedError;
}

const DisplayError = ({ error, simple }: Props) => {
  return (
    <>
      {error && 'data' in error && (
        <Box>
          {typeof error.data !== 'string' &&
            error.data.errors.map((error, index) => {
              return !simple ? (
                <FormHelperText error key={index}>
                  {error.message}
                </FormHelperText>
              ) : (
                <Typography key={index}> {error.message}</Typography>
              );
            })}
        </Box>
      )}
    </>
  );
};

export default DisplayError;
