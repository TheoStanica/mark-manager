import styled from 'styled-components';

export const StyledFilterDiv = styled.div`
  transition: 0.2s ease-in-out;
  z-index: 4200;
  padding: 0.5rem;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
  color: ${(props) => (props.theme.pref === 'dark' ? 'white' : 'black')};
  box-shadow: ${(props) =>
    props.theme.pref === 'dark'
      ? '0 0 1rem 0 rgb(133 133 133 / 10%)'
      : '0 0 0.875rem 0 rgb(33 37 41 / 20%)'};
`;

export const StyledFilterButton = styled.button`
  transition: 0.2s ease-in-out;
  padding: 0.5rem 1rem;
  background: ${({ isSelected }) => (isSelected ? '#068abc' : '#068abc22')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#ddda')};
  outline: none;
  border: none;
  border-radius: 20px;
  margin-right: 5px;
  margin-bottom: 5px;
  transition: background 0.15s ease;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
`;
