import styled from 'styled-components';

export const StyledDashboard = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) =>
    props.theme.pref === 'dark' ? '#30353A' : '#e5e8ed'};
`;
