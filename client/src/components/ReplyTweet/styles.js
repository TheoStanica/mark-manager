import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  min-width: 600px;
  height: 180px;
  border-radius: 5px;
  padding: 0.5rem;
  margin-top: 10px;
  background: ${(props) => (props.theme.pref === 'dark' ? '#30353A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  transition: 0.2s ease-in-out;

  @media only screen and (max-width: 650px) {
    min-width: 85vw;
  }
  @media only screen and (max-width: 500px) {
    min-width: 80vw;
  }
`;
