import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMoreReplies,
  fetchTweetReplies,
  resetReplies,
} from '../../redux/actions/twitterRepliesActions';
import Loading from '../Loading/Loading';
import {
  StyledHeaderWrapper,
  StyledTweetDetailsClose,
  StyledTweetDetailsWrapper,
  StyledTweetReplies,
  StyledWidthContainer,
  TweetWrapper,
} from './styles';
import TweetCard from './TweetCard';

const TweetDetails = ({ children, stream, tweetId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);
  const hasMoreReplies = useSelector(
    (state) => state.twitterRepliesReducer.metadata?.moreReplies
  );
  const tweetObj = useSelector(
    (state) => state.twitterReducer.tweetsById[tweetId]
  );
  let data = tweetObj;

  if (tweetObj.retweeted_status) {
    data = tweetObj.retweeted_status;
  }

  const { metadata, replies, repliesById, isLoading } = useSelector(
    (state) => state.twitterRepliesReducer
  );
  const dispatch = useDispatch();

  const changeIsVisible = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible && !wasClicked) {
      dispatch(
        fetchTweetReplies({
          twitterUserId: stream.twitterUserId,
          repliesToScreenName: data.user.screen_name,
          inReplyToStatusId: data.id_str,
          sinceId: data.id_str,
        })
      );
      setWasClicked(true);
    } else if (!isVisible && wasClicked) {
      dispatch(resetReplies());
      setWasClicked(false);
    }
  }, [
    isVisible,
    dispatch,
    stream.twitterUserId,
    data.user.screen_name,
    data.id_str,
    wasClicked,
  ]);

  const renderRepliesCards = () => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          dispatch(
            fetchMoreReplies({
              twitterUserId: stream.twitterUserId,
              repliesToScreenName: data.user.screen_name,
              inReplyToStatusId: data.id_str,
              sinceId: data.id_str,
              maxId: metadata.maxId,
            })
          )
        }
        hasMore={hasMoreReplies}
        useWindow={false}
        threshold={700}
        loader={<Loading key={0} />}
      >
        {replies.map((reply, idx) => (
          <TweetCard
            streamId={stream.id}
            tweet={repliesById[reply]}
            key={idx + 1}
            isReply={true}
          />
        ))}
      </InfiniteScroll>
    );
  };

  const renderRepliesSection = () => {
    return replies.length > 0 ? (
      renderRepliesCards()
    ) : (
      <StyledHeaderWrapper>
        Damn. We could not find any replies :(
      </StyledHeaderWrapper>
    );
  };

  return (
    <>
      <TweetWrapper onClick={changeIsVisible}>{children}</TweetWrapper>
      {isVisible
        ? ReactDOM.createPortal(
            <>
              <StyledTweetDetailsClose onClick={changeIsVisible}>
                X
              </StyledTweetDetailsClose>
              <StyledTweetDetailsWrapper>
                <StyledWidthContainer>
                  {children}
                  <StyledTweetReplies>
                    {isLoading ? <Loading /> : renderRepliesSection()}
                  </StyledTweetReplies>
                </StyledWidthContainer>
              </StyledTweetDetailsWrapper>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export default TweetDetails;
