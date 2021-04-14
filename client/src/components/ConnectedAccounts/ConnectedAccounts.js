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
  StyledConnect,
} from './styles';

const ConnectedAccounts = () => {
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );

  const renderAccountCard = (accountId, idx) => (
    <Card key={idx} style={{ boxShadow: 'none' }}>
      <CardBody>
        <StyledProfileInfoWrapper>
          <StyledRoundedImage
            src={twitterAccountsById[accountId].profileImage}
            alt={twitterAccountsById[accountId].profileImage}
          />
          <StyledAccountDetailsInfo>
            Twitter
            <div>
              <strong style={{ marginRight: '.5rem', whiteSpace: 'nowrap' }}>
                {twitterAccountsById[accountId].name}
              </strong>
              @{twitterAccountsById[accountId].screenName}
            </div>
          </StyledAccountDetailsInfo>
        </StyledProfileInfoWrapper>
      </CardBody>
    </Card>
  );

  const renderAccounts = () => {
    return twitterAccounts?.length > 0 ? (
      <>
        <CardHeader>Your accounts</CardHeader>
        {twitterAccounts?.map((account, idx) => {
          return renderAccountCard(account, idx);
        })}
      </>
    ) : (
      <StyledNotConnected>No accounts connected</StyledNotConnected>
    );
  };

  return (
    <Popover
      content={
        <div style={{ boxShadow: '0 0 0.875rem 0 rgb(33 37 41 / 20%)' }}>
          {renderAccounts()}
          <StyledConnect>
            <ConnectTwitterButton />
          </StyledConnect>
        </div>
      }
    >
      <ClearButton>Accounts</ClearButton>
    </Popover>
  );
};

export default ConnectedAccounts;
