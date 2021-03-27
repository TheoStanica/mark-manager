import styled from 'styled-components';

export const StyledDashboardStreams = styled.div`
  height: calc(100vh - 60px);
  width: calc(100vw - 80px);
  white-space: nowrap;
`;

export const StyledStreamsWrapper = styled.div`
  overflow: overlay;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const StyledStreamContainer = styled.li`
  margin-left: 0.5rem;
`;

export const StyledStreamsList = styled.ul`
  height: 100%;
  display: flex;
  list-style: none;
`;
