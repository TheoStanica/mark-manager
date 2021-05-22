import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  StyledTweetDetailsClose,
  StyledTweetDetailsWrapper,
  TweetWrapper,
} from './styles';

const Tweet = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const changeIsVisible = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
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
                <div style={{ maxWidth: 700 }}>{children}</div>
              </StyledTweetDetailsWrapper>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export default Tweet;
