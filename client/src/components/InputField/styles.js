import styled from 'styled-components';

export const ContentName = styled.span`
  position: absolute;
  bottom: 15px;
  left: 10px;
  transition: all 0.3s ease;
`;
export const LabelName = styled.label``;
export const InputFieldDiv = styled.div`
  width: 100%;
  position: relative;
  height: 50px;
  overflow: hidden;
  font-size: 1rem;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 100%;
    padding: 20px 10px 0 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    background-color: transparent;
    &:disabled {
      background-color: rgba(0, 0, 0, 0.03);
      border: 1px solid transparent;
    }
    &:focus {
      + {
        ${LabelName} {
          ${ContentName} {
            transform: translateY(-90%);
            font-size: 14px;
            color: black;
          }
          &::after {
            width: 100%;
          }
        }
      }
    }
    &:not(:placeholder-shown) {
      + {
        ${LabelName} {
          ${ContentName} {
            transform: translateY(-90%);
            font-size: 14px;
            color: black;
          }
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
  label {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 100%;
      width: 0%;
      border-bottom: 5px solid rgba(71, 0, 161, 1);
      transition: all 0.3s ease;
    }
  }
`;

export const InputFileDiv = styled.div`
  input[type='file'] {
    display: none;
  }
`;
export const InputFileLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  background: linear-gradient(
    90deg,
    rgba(71, 0, 161, 1) 0%,
    rgba(161, 0, 166, 1) 100%
  );
  color: white;
`;
