import styled from 'styled-components';

export const StyledSettings = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 15vw;
  background: ${(props) =>
    props.theme.pref === 'dark' ? '#30353A' : '#e5e8ed'};
  @media only screen and (max-width: 1400px) {
    padding: 2rem 10vw;
  }
  @media only screen and (max-width: 1200px) {
    padding: 2rem 7vw;
  }
  @media only screen and (max-width: 900px) {
    padding: 2rem;
    .settings-row {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 600px) {
    padding: 1rem;
  }
`;
export const StyledHeader = styled.h1`
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
