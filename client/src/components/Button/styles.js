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
  border: 1px solid rgba(71, 0, 161, 1);
  background-blend-mode: multiply;
  z-index: 1;
  a {
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
    background: linear-gradient(
      90deg,
      rgba(71, 0, 161, 1) 0%,
      rgba(161, 0, 166, 1) 100%
    );
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
