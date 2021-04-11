import styled from 'styled-components';

export const StyledTimeline = styled.div`
  width: 33vw;
  min-width: 350px;
  max-width: 500px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  background: white;
`;

export const StyledSpan = styled.span``;
export const StyledTimelineHeader = styled.div`
  background: #068abc;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.125rem;
  ${StyledSpan} {
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export const StyledTimelineBody = styled.div`
  padding: 0.3rem;
  flex-grow: 1;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
`;
