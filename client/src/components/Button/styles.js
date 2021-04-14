import styled from 'styled-components';

export const StyledButton = styled.button`
  align-self: baseline;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: none;
  outline: none;
  border: none;
  border: 1px solid #068abc;
  background-blend-mode: multiply;
  z-index: 1;
  a {
    color: #068abc;
    text-decoration: none;
  }
  &:focus {
    outline: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #068abc;
    z-index: -1;
    transition: transform 0.1s ease;
    transform: scaleX(0);
    transform-origin: right;
    border-radius: 4px;
  }
  &:hover {
    color: white;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    a {
      color: white;
    }
  }
`;
