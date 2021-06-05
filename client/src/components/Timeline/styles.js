import styled from 'styled-components';

export const StyledTimeline = styled.div`
  width: 33vw;
  min-width: 350px;
  max-width: 500px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  background: white;
  white-space: break-spaces;
`;

export const StyledSpan = styled.span``;
export const StyledTimelineHeader = styled.div`
  background: #068abc;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.125rem;
  ${StyledSpan} {
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export const StyledTimelineBody = styled.div`
  transition: 0.2s ease-in-out;
  background: ${(props) => (props.theme.pref === 'dark' ? '#30353a' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? '#eee' : 'black')};
  flex-grow: 1;
  overflow: overlay;
  z-index: 1;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.pref === 'dark'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.2)'};
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.pref === 'dark'
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.5)'};
  }
`;
