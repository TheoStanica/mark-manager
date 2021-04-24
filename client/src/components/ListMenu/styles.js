import styled from 'styled-components';

export const StyledListMenu = styled.div`
  align-self: baseline;
  margin: 0;
  min-width: 200px;
  width: 100%;
  border-radius: 5px;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  box-shadow: 0 0 0.875rem 0 rgb(33 37 41 / 5%);
`;

export const StyledListMenuHeader = styled.h2`
  padding: 0.7rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
`;
