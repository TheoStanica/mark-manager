import styled from 'styled-components';

export const StyledMessage = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  margin-top: 1rem;
  background: ${(porps) => (porps.type === 'error' ? '#f8d7da' : '#d1ecf1;')};
  color: ${(porps) => (porps.type === 'error' ? '#842029' : '#0e616e;')};
`;
