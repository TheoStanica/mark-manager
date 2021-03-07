import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTwitterHomeTimeline } from '../redux/actions/twitterActions';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/Timeline.Body';
import TimelineHeader from './Timeline/Timeline.Header';
import TweetCard from './Tweet/TweetCard';

const TwitterHomeTimeline = ({ id }) => {
  const { home_timeline_tweets: tweets, screenName } = useSelector(
    (state) => state.twitterReducer
  );
  const dispatch = useDispatch();

  return (
    <Timeline key={id}>
      <TimelineHeader
        type="Home"
        account={screenName}
        className="pb-05"
        onRefresh={() => dispatch(getTwitterHomeTimeline())}
      ></TimelineHeader>
      <TimelineBody>
        {tweets &&
          tweets.map((tweet, idx) => {
            return <TweetCard tweet={tweet} key={idx} />;
          })}
      </TimelineBody>
    </Timeline>
  );
};

export default TwitterHomeTimeline;
