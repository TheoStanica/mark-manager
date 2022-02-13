import { Typography } from '@mui/material';
import React from 'react';

const StreamType = ({ stream }) => {
  const getStreamType = () => {
    switch (stream?.type) {
      case 'home_timeline':
        return 'Home Timeline';
      case 'search':
        return `Search ${stream.search}`;
      default:
        return null;
    }
  };

  return (
    <Typography fontWeight="bold" sx={noWrap}>
      {getStreamType()}
    </Typography>
  );
};

const noWrap = {
  whiteSpace: 'nowrap',
};

export default StreamType;
