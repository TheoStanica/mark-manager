import styled from 'styled-components';

export const StyledSettings = styled.div`
  transition: 0.2s ease-in-out;
  flex-grow: 1;
`;
export const StyledHeader = styled.h1`
  transition: 0.2s ease-in-out;
  font-size: 2.4rem;
  margin-bottom: 15px;
  font-weight: normal;
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
`;

export const StyledSettingsRow = styled.div`
  display: flex;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;
