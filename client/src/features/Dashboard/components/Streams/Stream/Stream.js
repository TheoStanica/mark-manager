import { Paper } from '@mui/material';
import React from 'react';
import StreamBody from './StreamBody';
import StreamHeader from './StreamHeader/StreamHeader';

const Stream = ({ stream, provided }) => {
  return (
    <Paper elevation={3} sx={container}>
      <StreamHeader
        dragHandleProps={provided.dragHandleProps}
        stream={stream}
      />
      <StreamBody />
    </Paper>
  );
};

const container = {
  minWidth: 350,
  maxWidth: 500,
  width: '33vw',
  height: '100%',
};

export default Stream;
