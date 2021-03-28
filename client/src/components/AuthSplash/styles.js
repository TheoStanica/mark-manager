import styled from 'styled-components';

export const SplashDiv = styled.div`
  padding: 0 3.9rem;
  width: 100%;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    padding: 0 3rem;
  }
  @media only screen and (max-width: 900px) {
    padding: 0 2rem;
    background: linear-gradient(
      180deg,
      rgba(44, 0, 100, 0.5) 0%,
      rgba(255, 255, 255, 1) 30%
    );
  }
  @media only screen and (max-width: 600px) {
    padding: 0 1rem;
  }
`;

export const Background = styled.div`
  position: absolute;
  right: 0;
  left: 40%;
  height: 100%;
  overflow: hidden;
  @media only screen and (max-width: 1200px) {
    left: 50%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
export const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 55%;
  color: white;
  font-size: 5.5rem;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 40%;
  @media only screen and (max-width: 1200px) {
    left: 53%;
  }
`;
