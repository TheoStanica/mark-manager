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

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stream = React.memo(({ id, provided, onLoad, onLoadMore, type }) => {
  const { screenName } = useSelector((state) => state.twitterReducer);
  const stream = useSelector((state) => state.twitterReducer.streamsById[id]);
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
          return <TweetCard tweet={tweet} key={idx} />;
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
        account={screenName}
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
