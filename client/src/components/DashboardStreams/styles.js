import styled from 'styled-components';

export const StyledDashboardStreams = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 80px);
  white-space: nowrap;
  padding-top: 0.3rem;
`;

export const StyledStreamsWrapper = styled.div`
  overflow: scroll;
  height: 100%;
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

export const StyledStreamContainer = styled.li`
  margin-left: 0.3rem;
`;

export const StyledStreamsList = styled.ul`
  height: 100%;
  display: inline-flex;
  list-style: none;
`;
