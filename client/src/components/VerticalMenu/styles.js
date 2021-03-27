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
  background-color: #2c0064;
  color: white;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
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
`;

export const StyledDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  margin: 0.5rem 0;
`;
