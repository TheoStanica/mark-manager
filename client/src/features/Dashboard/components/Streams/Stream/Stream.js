import { Paper, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import StreamBody from './StreamBody';
import StreamHeader from './StreamHeader/StreamHeader';

const Stream = ({ stream, provided, snapshot, onDragging }) => {
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // required to disable snap scrolling in parent container while dragging
    if (snapshot?.isDragging && onDragging) {
      onDragging();
    }
  }, [snapshot, onDragging]);

  return (
    <Paper elevation={3} sx={container(isLowerSizeScreen)}>
      <StreamHeader
        dragHandleProps={provided.dragHandleProps}
        stream={stream}
      />
      <StreamBody />
    </Paper>
  );
};

const container = (isLowerSizeSceen) => ({
  minWidth: 300,
  maxWidth: isLowerSizeSceen ? '100vw' : 500,
  width: isLowerSizeSceen ? '100vw' : '33vw',
  height: '100%',
});

export default Stream;
