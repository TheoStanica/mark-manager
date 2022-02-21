import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import useIsMobileScreen from '../../../../../core/hooks/useIsMobileScreen';
import StreamBody from './StreamBody';
import StreamHeader from './StreamHeader/StreamHeader';

const Stream = ({ stream, provided, snapshot, onDragging }) => {
  const isMobile = useIsMobileScreen();

  useEffect(() => {
    // required to disable snap scrolling in parent container while dragging
    if (snapshot?.isDragging && onDragging) {
      onDragging();
    }
  }, [snapshot, onDragging]);

  return (
    <Paper elevation={isMobile ? 1 : 3} sx={container(isMobile)}>
      <StreamHeader
        dragHandleProps={provided.dragHandleProps}
        stream={stream}
      />
      <StreamBody />
    </Paper>
  );
};

const container = (isMobile) => ({
  minWidth: 300,
  maxWidth: isMobile ? '100vw' : 500,
  width: isMobile ? '100vw' : '33vw',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: isMobile ? 0 : 1,
});

export default Stream;
