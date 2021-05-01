import styled from 'styled-components';

export const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    border-radius: 50%;
  }
  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: #151719;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

export const StyledCheckbox = styled.input`
  &:checked {
    + {
      ${StyledSlider} {
        // background-color: white;
        &:before {
          -webkit-transform: translateX(21px);
          -ms-transform: translateX(21px);
          transform: translateX(21px);
          background-color: #068abc;
        }
      }
    }
  }
  &:focus {
    + {
      ${StyledSlider} {
        box-shadow: 0 0 1px #2196f3;
      }
    }
  }
`;
