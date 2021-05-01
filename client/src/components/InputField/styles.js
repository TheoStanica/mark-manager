import styled from 'styled-components';

export const ContentName = styled.span`
  position: absolute;
  bottom: 15px;
  left: 10px;
  transition: all 0.2s ease;
`;
export const LabelName = styled.label``;
export const InputFieldDiv = styled.div`
  transition: 0.2s ease-in-out;
  width: 100%;
  position: relative;
  height: 50px;
  overflow: hidden;
  font-size: 1rem;
  margin-bottom: 20px;
  background: ${(props) =>
    props.theme.pref === 'dark' ? '#30353A' : 'transparent'};
  input {
    color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
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
      border-bottom: 5px solid #068abc;
      transition: all 0.2s ease;
    }
  }
`;

export const InputFileDiv = styled.div`
  input[type='file'] {
    display: none;
  }
`;
export const InputFileLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  background: #068abc;
  color: white;
`;
