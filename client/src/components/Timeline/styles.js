import styled from 'styled-components';

export const StyledTimeline = styled.div`
  width: 500px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(44, 0, 100, 0.5) 0%,
    rgba(227, 181, 164, 0.5) 100%
  );
`;

export const StyledSpan = styled.span``;
export const StyledTimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  ${StyledSpan} {
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export const StyledTimelineBody = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  overflow: overlay;
`;
