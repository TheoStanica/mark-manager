import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadMoreTwitterStreamTweets,
  reloadTwitterStream,
} from '../redux/actions/twitterActions';
import Stream from './Stream';

const TwitterHomeTimeline = React.memo(({ stream, provided }) => {
  const dispatch = useDispatch();
  const loadTweets = useCallback(() => {
    dispatch(
      reloadTwitterStream({
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
          loadMoreTwitterStreamTweets({
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
