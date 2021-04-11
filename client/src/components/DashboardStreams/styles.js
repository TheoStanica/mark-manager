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
`;

export const StyledStreamContainer = styled.li`
  margin-left: 0.3rem;
`;

export const StyledStreamsList = styled.ul`
  height: 100%;
  display: inline-flex;
  list-style: none;
`;
