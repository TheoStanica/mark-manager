import styled from 'styled-components';

export const StyledCard = styled.div`
  transition: 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  background: white;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? '#ddd' : 'black')};
  box-shadow: 0 0 0.875rem 0 rgb(33 37 41 / 10%);

  & a {
    color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  }
`;

export const StyledCardBody = styled.div`
  padding: 1rem;
`;
export const StyledCardHeader = styled.div`
  transition: 0.2s ease-in-out;
  font-size: 1.5rem;
  padding: 0.7rem 1rem;
  white-space: initial;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
`;
export const StyledCardFooter = styled.div`
  padding: 0.7rem 1rem;
`;
