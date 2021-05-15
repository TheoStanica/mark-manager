import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStream } from '../redux/actions/twitterActions';
import Loading from './Loading/Loading';
import Timeline from './Timeline/Timeline';
import TimelineBody from './Timeline/TimelineBody';
import TimelineHeader from './Timeline/TimelineHeader';
import TweetCard from './Tweet/TweetCard';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { createSelector } from 'reselect';
import Tweet from './Tweet/Tweet';

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const selectScreenName = (streamId) =>
  createSelector(
    (state) =>
      state?.twitterReducer?.twitterAccountsById[
        state?.twitterReducer?.streamsById[streamId]?.twitterUserId
      ]?.screenName,
    (screenName) => screenName
  );

const Stream = React.memo(({ id, provided, onLoad, onLoadMore, type }) => {
  const stream = useSelector((state) => state.twitterReducer.streamsById[id]);
  const screenName = useSelector(selectScreenName(stream.id));
  const dispatch = useDispatch();

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  const renderTweets = () => {
    return stream?.tweets?.length > 0 ? (
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={false}
        threshold={500}
      >
        {stream.tweets.map((tweet, idx) => {
          return (
            <Tweet key={idx}>
              <TweetCard streamId={id} tweet={tweet} key={idx} />
            </Tweet>
          );
        })}
      </InfiniteScroll>
    ) : (
      <StyledContainer>No tweets</StyledContainer>
    );
  };

  return (
    <Timeline>
      <TimelineHeader
        type={type}
        account={screenName ? screenName : ''}
        onRefresh={onLoad}
        onRemove={() => {
          dispatch(removeStream({ id: stream.id }));
        }}
        {...provided.dragHandleProps}
      ></TimelineHeader>
      <TimelineBody>
        {stream.isLoading ? (
          <StyledContainer>
            <Loading />
          </StyledContainer>
        ) : (
          renderTweets()
        )}
      </TimelineBody>
    </Timeline>
  );
});

export default Stream;
