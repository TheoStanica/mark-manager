import styled from 'styled-components';

export const StyledModalWrapper = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  color: black;
`;

export const StyledModal = styled.div`
  display: ${(props) => (props.visible ? 'box' : 'none')};
`;
