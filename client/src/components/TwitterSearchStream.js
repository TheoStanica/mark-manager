import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTweetSearchStream } from '../redux/actions/twitterActions';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/TimelineBody';
import TimelineHeader from './Timeline/TimelineHeader';
import TweetCard from './Tweet/TweetCard';

const TwitterSearchStream = ({ stream, provided }) => {
  const { screenName } = useSelector((state) => state.twitterReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // you should fetch stream tweets right here
  }, []);

  return (
    <Timeline>
      <TimelineHeader
        type={`Search ${stream.search}`}
        account={screenName}
        className="pb-05"
        onRefresh={() =>
          dispatch(
            refreshTweetSearchStream({ id: stream.id, search: stream.search })
          )
        }
        {...provided.dragHandleProps}
      ></TimelineHeader>
      <TimelineBody>
        {stream.tweets &&
          stream.tweets.map((tweet, idx) => {
            return <TweetCard tweet={tweet} key={idx} />;
          })}
      </TimelineBody>
    </Timeline>
  );
};

export default TwitterSearchStream;
