import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadHomeTimelineStream,
  loadMoreHomeTimelineStream,
} from '../redux/actions/twitterActions';
import Stream from './Stream';

const TwitterHomeTimeline = React.memo(({ stream, provided }) => {
  const dispatch = useDispatch();

  return (
    <Stream
      id={stream.id}
      provided={provided}
      type="Home"
      onLoad={useCallback(() => {
        dispatch(loadHomeTimelineStream({ id: stream.id }));
      }, [dispatch, stream.id])}
      onLoadMore={() =>
        dispatch(
          loadMoreHomeTimelineStream({
            id: stream.id,
            maxId: stream.metadata.max_id,
          })
        )
      }
    />
  );
});

export default TwitterHomeTimeline;
