import styled from 'styled-components';

export const StyledMkToolTipSpan = styled.span`
  ${({ position, offset }) => {
    if (position === 'top')
      return `bottom: calc(10px + ${offset ? offset : 0}px);`;
    if (position === 'bottom')
      return ` top: calc(200% + 10px + ${offset ? offset : 0}px);`;
    if (position === 'right')
      return `top: 50%; left: calc(100% + 5px +  ${offset ? offset : 0}px); `;
    if (position === 'left')
      return `top: 50%; right: calc(100% + 5px + ${offset ? offset : 0}px); `;
  }};
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  position: absolute;
  z-index: 1000;
  transform: translateY(-50%);

  &::after {
    ${({ position, spanWidth }) => {
      if (position === 'top')
        return `top: 98%; left: calc(${
          spanWidth / 2
        }px - 5px);  transform: rotatez(-90deg); `;
      if (position === 'bottom')
        return `left: calc(${
          spanWidth / 2
        }px - 5px); transform: rotatez(90deg);  bottom: 99%;`;
      if (position === 'right')
        return `top: 50%; right: 100%; margin-top: -5px ;`;
      if (position === 'left')
        return `top: 50%; left: 100%; margin-top: -5px ; transform: rotatez(180deg);`;
    }}
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
