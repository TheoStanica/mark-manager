import styled from 'styled-components';

export const StyledEdit = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

export const StyledInfo = styled.div`
  width: 67%;
  margin-right: 1rem;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledAvatar = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 128px;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 600px) {
    margin-bottom: 1rem;
    width: 100%;
  }
`;
