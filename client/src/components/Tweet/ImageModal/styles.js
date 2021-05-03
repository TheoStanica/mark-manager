import styled from 'styled-components';

export const StyledImageWrapper = styled.div`
  cursor: pointer;
`;

export const StyledImageModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImageContent = styled.img`
  max-width: 95%;
  max-height: 95%;

  @media only screen and (max-width: 900px) {
    max-width: 97.5%;
  }
  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;
