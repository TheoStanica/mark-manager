import { Paper } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { twitterApi } from '../../../../../api/twitter';
import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../../api/user';
import { IStreamPreference } from '../../../../../api/user/types';
import useIsMobileScreen from '../../../../../core/hooks/useIsMobileScreen';
import StreamBody from './StreamBody';
import StreamHeader from './StreamHeader';

interface Props {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onDragging: () => any;
  stream: IStreamPreference<unknown>;
}

const Stream = ({ stream, provided, snapshot, onDragging }: Props) => {
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();
  const isMobile = useIsMobileScreen();
  const dispatch = useDispatch();

  useEffect(() => {
    // required to disable snap scrolling in parent container while dragging
    if (snapshot?.isDragging && onDragging) {
      onDragging();
    }
  }, [snapshot, onDragging]);

  const onDelete = useCallback(
    (streamId: string) => {
      if (!data) {
        return;
      }
      const stream_preferences = data.user.stream_preferences;
      const newPref = stream_preferences.filter(
        (stream) => stream.id !== streamId
      );
      update({ stream_preferences: newPref });
    },
    [data, update]
  );

  return (
    <Paper elevation={isMobile ? 1 : 3} sx={container(isMobile)}>
      <StreamHeader
        dragHandleProps={provided.dragHandleProps}
        stream={stream}
        onDelete={onDelete}
        onReload={() => {
          dispatch(twitterApi.util.resetApiState());
        }}
      />
      <StreamBody stream={stream} />
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
