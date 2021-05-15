import styled from 'styled-components';

export const StyledCircleImage = styled.img`
  border-radius: 100%;
  width: 48px;
  height: 48px;
`;

export const StyledMessage = styled.p`
  width: 100%;
  white-space: break-spaces;
  word-break: break-word;
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTweetMetadata = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const StyledTweetFooterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledQuotedTweet = styled.div`
  margin-top: 1rem;
  box-shadow: ${(props) =>
    props.theme.pref === 'dark'
      ? 'rgba(0, 0, 0, 0.2) 0px 3px 6px, rgba(0, 0, 0, 0.3) 0px 3px 6px'
      : 'rgba(0, 0, 0, 0.05) 0px 3px 6px, rgba(0, 0, 0, 0.05) 0px 3px 6px'};
`;

export const StyledRetweetHeader = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
`;

export const StyledTweetPhoto = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
`;

export const StyledTweetDetailsWrapper = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  color: black;
`;
export const StyledTweetDetailsClose = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1101;
  color: white;
  font-size: 2.25rem;
  line-height: 2.25rem;
  cursor: pointer;
`;

export const TweetWrapper = styled.div``;
