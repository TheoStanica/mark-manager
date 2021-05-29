import styled from 'styled-components';

export const StyledHome = styled.div`
  width: 100%;
  h1 {
    font-size: 3rem;
    padding: 0 1rem;
  }
  button {
    align-self: center;
  }
  .soon {
    font-size: 0.7rem;
  }
`;

export const StyledHomeContainer = styled.section`
  background-color: ${(props) =>
    props.color ? `${props.color}` : 'transparent'};
  min-height: 100vh;
  padding: 0 3.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 950px) {
    flex-direction: ${(props) =>
      props.inverted ? 'column-reverse' : 'column'};
    justify-content: center;
    align-items: start;
  }
  @media only screen and (max-width: 1200px) {
    padding: 0 3rem;
  }
  @media only screen and (max-width: 900px) {
    padding: 0 2rem;
  }
  @media only screen and (max-width: 600px) {
    padding: 7rem 1rem;
  }
`;
export const StyledColFlex = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vw;
  @media only screen and (max-width: 950px) {
    max-width: 100vw;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  padding: 0 !important;
  line-height: 3.1rem;
  margin-bottom: 1rem;
  @media only screen and (max-width: 600px) {
    font-size: 2.25rem !important;
    line-height: 2.25rem;
  }
`;
export const StyledEmphasizedTitle = styled.span`
  font-size: 4rem;
  font-weight: bold;
  color: #068abc;
  @media only screen and (max-width: 600px) {
    font-size: 2.25rem !important;
  }
`;

export const StyledTitleDescription = styled.p`
  font-size: 1.8rem;
  @media only screen and (max-width: 600px) {
    font-size: 1.2rem !important;
  }
`;
export const StyledSmallDescription = styled.p`
  font-size: 1.3rem;
  @media only screen and (max-width: 600px) {
    font-size: 1.1rem !important;
  }
`;
export const StyledEmphasizedTitleDescription = styled.span`
  font-size: 1.8rem;
  color: #068abc;
  @media only screen and (max-width: 600px) {
    font-size: 1.2rem !important;
  }
`;
export const StyledImage = styled.img`
  max-width: 50vw;
  @media only screen and (max-width: 950px) {
    align-self: center;
    max-width: 70vw;
    margin-top: 2rem;
  }
  @media only screen and (max-width: 750px) {
    max-width: 80vw;
  }
  @media only screen and (max-width: 600px) {
  }
`;
