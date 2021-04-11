import styled from 'styled-components';

export const StyledFilterDiv = styled.div`
  z-index: 4200;
  padding: 0.5rem;
  border-radius: 5px;
  background: white;
`;

export const StyledFilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ isSelected }) => (isSelected ? '#2c0064' : '#2c006488')};
  color: white;
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
