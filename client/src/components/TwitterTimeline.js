import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTwitterHomeTimeline } from '../redux/actions/twitterActions';
import TweetCard from './TweetCard';

const TwitterTimeline = () => {
  const { home_timeline_tweets: tweets, screenName } = useSelector(
    (state) => state.twitterReducer
  );
  const dispatch = useDispatch();

  return (
    <div
      className=" card card-body twitterTimeline my-2 col-sm-13 col-md-9 col-lg-7 col-xl-6 vh-50 "
      style={{ maxHeight: '85vh', overflowY: 'scroll' }}
    >
      <div className="d-flex">
        <p className="col">
          Twitter Home Timeline <strong>@{screenName}</strong>
        </p>
        <div
          className="btn btn-primary col-md-2"
          onClick={() => dispatch(getTwitterHomeTimeline())}
        >
          Refresh
        </div>
      </div>
      {tweets &&
        tweets.map((tweet, idx) => {
          return <TweetCard tweet={tweet} key={idx} />;
        })}
    </div>
  );
};

export default TwitterTimeline;
