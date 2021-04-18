import styled from 'styled-components';

export const StyledFilterDiv = styled.div`
  z-index: 4200;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 0.875rem 0 rgb(33 37 41 / 20%);
`;

export const StyledFilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ isSelected }) => (isSelected ? '#068abc' : '#068abc22')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
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
