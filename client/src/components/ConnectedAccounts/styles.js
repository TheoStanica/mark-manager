import styled from 'styled-components';

export const StyledProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledRoundedImage = styled.img`
  border-radius: 100%;
  margin-right: 1rem;
`;

export const StyledAccountDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledNotConnected = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
  min-width: 300px;
`;

export const StyledConnect = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  border-top: ${(props) =>
    props.theme.pref === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.08)'};
  transition: 0.2s ease-in-out;
  background: ${(props) => (props.theme.pref === 'dark' ? '#23272A' : 'white')};
`;

export const StyledCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
