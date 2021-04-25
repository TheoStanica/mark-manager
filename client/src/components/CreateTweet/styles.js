import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 600px;
  height: 180px;
  border-radius: 5px;
  padding: 0.5rem;
  margin-top: 10px;
  background: ${(props) => (props.theme.pref === 'dark' ? '#30353A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  transition: 0.2s ease-in-out;
`;
