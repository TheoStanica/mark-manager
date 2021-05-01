import styled from 'styled-components';

export const StyledMkToolTipSpan = styled.span`
  visibility: visible;
  background-color: black;
  color: #fff;
  color: ${(props) => (props.theme.pref === 'dark' ? 'black' : 'white')};
  background: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  text-align: center;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  position: absolute;
  z-index: 1000;
  transform: translateY(-50%);
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
