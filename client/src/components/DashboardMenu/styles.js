import styled from 'styled-components';

export const StyledDashboardMenu = styled.div`
  transition: 0.2s ease-in-out;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.3rem;
  box-shadow: 0 0 0.875rem 0 rgb(33 37 41 / 5%);
`;

export const StyledHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
  margin-right: 0.5rem;
`;
