import styled from 'styled-components';

export const StyledMenuItem = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
export const StyledVerticalMenu = styled.div`
  background-color: ${(props) =>
    props.theme.pref === 'dark' ? '#151719' : '#068abc'};
  transition: 0.2s ease-in-out;
  color: white;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  z-index: 2000;
`;

export const StyledMenuIcon = styled.div`
  width: 44px;
  height: 44px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    margin: 0 auto;
  }
`;

export const StyledTop = styled.div`
  ${StyledMenuItem} {
    margin: 10px auto;
  }
  ${StyledMenuIcon} {
    margin: 10px auto;
  }

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledBottom = styled.div`
  ${StyledMenuIcon} {
    margin: 0px auto 0px auto;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledSeparator = styled.div`
  display: block;
  background-color: rgba(255, 255, 255, 0.5);
  height: 1px;
  margin: 20px 0;
`;

export const StyledRoundedImg = styled.img`
  border-radius: 100%;
  object-fit: cover !important;
`;

export const StyledDivider = styled.div`
  height: 1px;
  background: ${(props) =>
    props.theme.pref === 'dark' ? '#ffffff88' : '#00000088'};
  margin: 0.5rem 0;
`;
