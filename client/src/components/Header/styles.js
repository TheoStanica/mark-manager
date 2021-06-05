import styled from 'styled-components';

export const StyledItem = styled.li``;
export const StyledNavbar = styled.nav`
  position: absolute;
  border-bottom: ${(props) =>
    props.normal ? '0.0625rem solid #e0e0e0;' : 'none'};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 3.9rem;
  font-size: 1.5rem;
  z-index: 100;
  ${StyledItem} {
    padding-left: 2rem;
    a {
      color: ${(props) => (props.normal ? 'black' : 'white')};
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 1200px) {
    padding: 1rem 3rem;
  }
  @media only screen and (max-width: 900px) {
    padding: 1rem 2rem;
  }
  @media only screen and (max-width: 600px) {
    padding: 1rem 1rem;
  }
`;

export const StyledList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  list-style: none;
`;
