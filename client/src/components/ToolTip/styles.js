import styled from 'styled-components';

export const StyledMkToolTipSpan = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  transform: translateY(-50%);
  top: 50%;
  left: calc(100% + 10px);
  &::after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent black transparent transparent;
  }
`;

export const StyledMkToolTip = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  &:hover {
    ${StyledMkToolTipSpan} {
      visibility: visible;
      pointer-events: none;
    }
  }
`;
