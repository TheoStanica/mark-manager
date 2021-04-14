import styled from 'styled-components';

export const StyledPopupWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  z-index: 1000;
  padding-bottom: 10px;
`;
export const StyledPopover = styled.div`
  position: relative;
  &:hover {
    ${StyledPopupWrapper} {
      display: block;
    }
  }
`;

export const StyledPopup = styled.div`
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  background: white;
  box-shadow: 0 0 0.875rem 0 rgb(33 37 41 / 5%);
  border: none;
  color: black;
  a {
    text-decoration: none;
  }
`;
