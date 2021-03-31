import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadMoreTweetSearchStream,
  loadTweetSearchStream,
} from '../redux/actions/twitterActions';
import Stream from './Stream';

const TwitterSearchStream = React.memo(({ stream, provided }) => {
  const dispatch = useDispatch();

  return (
    <Stream
      id={stream.id}
      provided={provided}
      type={`Search ${stream.search}`}
      onLoad={useCallback(() => {
        dispatch(
          loadTweetSearchStream({ id: stream.id, search: stream.search })
        );
      }, [dispatch, stream.id, stream.search])}
      onLoadMore={() =>
        dispatch(
          loadMoreTweetSearchStream({
            id: stream.id,
            search: stream.search,
            maxId: stream.metadata.max_id,
          })
        )
      }
    />
  );
});

export default TwitterSearchStream;
