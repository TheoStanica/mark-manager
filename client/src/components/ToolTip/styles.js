import styled from 'styled-components';

export const StyledMkToolTipSpan = styled.span`
  visibility: visible;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  position: absolute;
  z-index: 1000;
  transform: translateY(-50%);

  &::after {
    content: ' ';
    position: absolute;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
`;

export const StyledMkToolTip = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${StyledMkToolTipSpan} {
      visibility: visible;
      pointer-events: none;
    }
  }
`;

export const StyledCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
