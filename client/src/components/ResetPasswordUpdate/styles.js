import styled from 'styled-components';

export const StyledPasswordUpdate = styled.div`
  position: relative;
  width: 33vw;
  @media only screen and (max-width: 1200px) {
    width: 40vw;
  }
  @media only screen and (max-width: 900px) {
    margin: 0 auto;
    width: 60vw;
  }
  @media only screen and (max-width: 600px) {
    width: 80vw;
  }
`;

export const StyledHeader = styled.h1`
  font-size: 2.7rem;
  margin-bottom: 1rem;
`;

export const StyledMessages = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
`;
