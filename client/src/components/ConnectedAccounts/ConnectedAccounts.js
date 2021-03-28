import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import ClearButton from '../ClearButton/ClearButton';
import ConnectTwitterButton from '../ConnectTwitterButton';
import Popover from '../Popover/Popover';
import {
  StyledProfileInfoWrapper,
  StyledRoundedImage,
  StyledAccountDetailsInfo,
  StyledNotConnected,
  StyledDivider,
  StyledConnect,
} from './styles';

const ConnectedAccounts = () => {
  const { isConnected, name, screenName, profileImage } = useSelector(
    (state) => state.twitterReducer
  );

  const renderAccounts = () => {
    return isConnected ? (
      <>
        <CardHeader>Your accounts</CardHeader>
        <Card style={{ boxShadow: 'none' }}>
          <CardBody>
            <StyledProfileInfoWrapper>
              <StyledRoundedImage src={profileImage} alt={profileImage} />
              <StyledAccountDetailsInfo>
                Twitter
                <div>
                  <strong style={{ marginRight: '.5rem' }}>{name}</strong>@
                  {screenName}
                </div>
              </StyledAccountDetailsInfo>
            </StyledProfileInfoWrapper>
          </CardBody>
        </Card>
      </>
    ) : (
      <StyledNotConnected>No accounts connected</StyledNotConnected>
    );
  };
  const renderAddAccounts = () => {
    return isConnected ? null : (
      <>
        <StyledDivider></StyledDivider>
        <StyledConnect>
          <ConnectTwitterButton />
        </StyledConnect>
      </>
    );
  };

  return (
    <Popover
      content={
        <>
          {renderAccounts()}
          {renderAddAccounts()}
        </>
      }
    >
      <ClearButton>Accounts</ClearButton>
    </Popover>
  );
};

export default ConnectedAccounts;
