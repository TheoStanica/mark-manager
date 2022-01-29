import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const Loading = ({
  message = 'Loading...',
  circularProgressProps,
  noMessage = false,
}) => {
  return (
    <>
      <CircularProgress {...circularProgressProps} />
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ textAlign: 'center' }}>
          {!noMessage && message}
        </Typography>
      </Box>
    </>
  );
};

export default Loading;
