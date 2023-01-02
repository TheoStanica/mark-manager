import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  circularProgressProps: CircularProgressProps;
  noMessage?: boolean;
  message: string;
}

const Loading = ({
  message = 'Loading...',
  circularProgressProps,
  noMessage = false,
}: Props) => {
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
