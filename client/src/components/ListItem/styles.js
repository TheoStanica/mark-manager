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
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};

  &:hover {
    background: #068abc;
    color: white;
    outline: none;
  }
  &:focus {
    background: #068abc;
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
  background: ${(props) => (props.active ? '#068abc;' : 'initial')};
  color: ${(props) => (props.active ? 'white' : 'none')};
  outline: ${(props) => (props.active ? 'none' : 'initial')};
`;
