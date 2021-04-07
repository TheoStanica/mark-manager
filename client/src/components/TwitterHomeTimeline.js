import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadHomeTimelineStream,
  loadMoreHomeTimelineStream,
} from '../redux/actions/twitterActions';
import Stream from './Stream';

const TwitterHomeTimeline = React.memo(({ stream, provided }) => {
  const dispatch = useDispatch();
  const loadTweets = useCallback(() => {
    dispatch(
      loadHomeTimelineStream({
        id: stream.id,
        twitterUserId: stream.twitterUserId,
      })
    );
  }, [dispatch, stream.id, stream.twitterUserId]);

  return (
    <Stream
      id={stream.id}
      provided={provided}
      type="Home"
      onLoad={loadTweets}
      onLoadMore={() =>
        dispatch(
          loadMoreHomeTimelineStream({
            id: stream.id,
            maxId: stream.metadata.max_id,
            twitterUserId: stream.twitterUserId,
          })
        )
      }
    />
  );
});

export default TwitterHomeTimeline;
