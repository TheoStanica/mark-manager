import styled from 'styled-components';

export const StyledCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledWrapper = styled.div`
  border-radius: 5px;
  background: white;
  box-shadow: ${(props) =>
    props.theme.pref === 'dark'
      ? '0 0 1rem 0 rgb(133 133 133 / 20%)'
      : '0 0 0.875rem 0 rgb(33 37 41 / 20%)'}; ;
`;
