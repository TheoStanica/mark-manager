import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHomeTimelineStream,
  removeStream,
  loadMoreHomeTimelineStream,
} from '../redux/actions/twitterActions';
import Loading from './Loading/Loading';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/TimelineBody';
import TimelineHeader from './Timeline/TimelineHeader';
import TweetCard from './Tweet/TweetCard';
import InfiniteScroll from 'react-infinite-scroller';

const TwitterHomeTimeline = React.memo(({ stream, provided }) => {
  const { screenName } = useSelector((state) => state.twitterReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeTimelineStream({ id: stream.id }));
  }, [dispatch, stream.id]);

  const renderTweets = () => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          dispatch(
            loadMoreHomeTimelineStream({
              id: stream.id,
              maxId: stream.metadata.max_id,
            })
          )
        }
        hasMore={true}
        useWindow={false}
        threshold={500}
      >
        {stream.tweets.map((tweet, idx) => {
          return <TweetCard tweet={tweet} key={idx} />;
        })}
      </InfiniteScroll>
    );
  };

  return (
    <Timeline>
      <TimelineHeader
        type="Home"
        account={screenName}
        onRefresh={() => dispatch(loadHomeTimelineStream({ id: stream.id }))}
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
        ) : stream.tweets ? (
          renderTweets()
        ) : null}
      </TimelineBody>
    </Timeline>
  );
});

export default TwitterHomeTimeline;
