import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { IStreamPreference } from '../../../../../api/user/types';
import useIsMobileScreen from '../../../../../core/hooks/useIsMobileScreen';
import StreamBody from './StreamBody';
import StreamHeader from './StreamHeader';

interface Props {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onDragging: () => any;
  stream: IStreamPreference;
}

const Stream = ({ stream, provided, snapshot, onDragging }: Props) => {
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
        onDelete={() => console.log('delete')}
        onReload={() => console.log('on reload')}
      />
      <StreamBody />
    </Paper>
  );
};

const container = (isMobile: boolean) => ({
  minWidth: 300,
  maxWidth: isMobile ? '100vw' : 500,
  width: isMobile ? '100vw' : '33vw',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: isMobile ? 0 : 1,
});

export default Stream;
