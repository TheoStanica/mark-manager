import styled from 'styled-components';

export const StyledRegisterDiv = styled.div`
  width: 33vw;
  max-width: 500px;
  position: relative;
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
  font-size: 4rem;
  padding-bottom: 50px;
`;

export const StyledMessages = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%);
`;

export const StyledSmallText = styled.div`
  font-size: 0.9rem;
  text-decoration: none;
  a {
    font-size: 0.9rem;
    text-decoration: none;
    color: #fa00ff;
  }
`;
