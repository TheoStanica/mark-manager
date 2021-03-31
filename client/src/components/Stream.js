import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHomeTimelineStream,
  loadTweetSearchStream,
  removeStream,
} from '../redux/actions/twitterActions';
import Loading from './Loading/Loading';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/TimelineBody';
import TimelineHeader from './Timeline/TimelineHeader';
import TweetCard from './Tweet/TweetCard';

const Stream = React.memo(({ id, provided }) => {
  const { screenName } = useSelector((state) => state.twitterReducer);
  const stream = useSelector((state) => state.twitterReducer.streamsById[id]);
  const dispatch = useDispatch();

  const refreshStream = useCallback(() => {
    switch (stream.type) {
      case 'home_timeline':
        dispatch(loadHomeTimelineStream({ id: stream.id }));
        break;
      case 'search':
        dispatch(
          loadTweetSearchStream({ id: stream.id, search: stream.search })
        );
        break;
      default:
        break;
    }
  }, [dispatch, stream.type, stream.id, stream.search]);

  useEffect(() => {
    refreshStream();
  }, [refreshStream]);

  return (
    <Timeline>
      <TimelineHeader
        type="Home"
        account={screenName}
        onRefresh={refreshStream}
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

export default Stream;
