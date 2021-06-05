import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadMoreTwitterStreamTweets,
  reloadTwitterStream,
} from '../redux/actions/twitterActions';
import Stream from './Stream';

const TwitterSearchStream = React.memo(({ stream, provided }) => {
  const dispatch = useDispatch();
  const loadTweets = useCallback(() => {
    dispatch(
      reloadTwitterStream({
        id: stream.id,
        search: stream.search,
        twitterUserId: stream.twitterUserId,
      })
    );
  }, [dispatch, stream.id, stream.search, stream.twitterUserId]);

  return (
    <Stream
      id={stream.id}
      provided={provided}
      type={`Search ${stream.search}`}
      onLoad={loadTweets}
      onLoadMore={() =>
        dispatch(
          loadMoreTwitterStreamTweets({
            id: stream.id,
            search: stream.search,
            maxId: stream.metadata.max_id,
            twitterUserId: stream.twitterUserId,
          })
        )
      }
    />
  );
});

export default TwitterSearchStream;
