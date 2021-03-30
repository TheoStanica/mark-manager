import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTweetSearchStream,
  removeStream,
} from '../redux/actions/twitterActions';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/TimelineBody';
import TimelineHeader from './Timeline/TimelineHeader';
import TweetCard from './Tweet/TweetCard';
import Loading from './Loading/Loading';

const TwitterSearchStream = React.memo(({ id, provided }) => {
  const { screenName } = useSelector((state) => state.twitterReducer);
  const stream = useSelector((state) => state.twitterReducer.streamsById[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTweetSearchStream({ id: stream.id, search: stream.search }));
  }, [dispatch, stream.id, stream.search]);

  return (
    <Timeline>
      <TimelineHeader
        type={`Search ${stream.search}`}
        account={screenName}
        onRefresh={() =>
          dispatch(
            loadTweetSearchStream({
              id: stream.id,
              search: stream.search,
            })
          )
        }
        onRemove={() => {
          dispatch(removeStream({ id: stream.id }));
        }}
        {...provided.dragHandleProps}
      ></TimelineHeader>
      <TimelineBody>
        {stream.isLoading ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading />
          </div>
        ) : (
          stream.tweets &&
          stream.tweets.map((tweet, idx) => {
            return <TweetCard tweet={tweet} key={idx} />;
          })
        )}
      </TimelineBody>
    </Timeline>
  );
});

export default TwitterSearchStream;
