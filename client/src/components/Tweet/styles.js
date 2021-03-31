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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const StyledRetweetHeader = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
`;
