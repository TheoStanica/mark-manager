import { Typography } from '@mui/material';
import React from 'react';
import {
  IStreamPreference,
  isTwitterStream,
} from '../../../../../../api/user/types';

interface Props {
  stream: IStreamPreference<unknown>;
}

const StreamType = ({ stream }: Props) => {
  const getStreamType = () => {
    if (isTwitterStream(stream)) {
      switch (stream.data.type) {
        case 'home_timeline':
          return 'Home Timeline';
        case 'search':
          return `Search ${stream.data.search}`;
        default:
          return null;
      }
    }
    return null;
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
