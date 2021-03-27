import styled from 'styled-components';

export const StyledListItemButton = styled.button`
  background: white;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: start;
  outline: none;
  word-wrap: break-word;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(71, 0, 161, 1) 0%,
      rgba(161, 0, 166, 1) 100%
    );
    color: white;
    outline: none;
  }
  &:focus {
    background: linear-gradient(
      90deg,
      rgba(71, 0, 161, 1) 0%,
      rgba(161, 0, 166, 1) 100%
    );
    color: white;
    outline: none;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  background: ${(props) =>
    props.active
      ? 'linear-gradient(90deg,rgba(71, 0, 161, 1) 0%,rgba(161, 0, 166, 1) 100%);'
      : 'initial'};
  color: ${(props) => (props.active ? 'white' : 'initial')};
  outline: ${(props) => (props.active ? 'none' : 'initial')};
`;
