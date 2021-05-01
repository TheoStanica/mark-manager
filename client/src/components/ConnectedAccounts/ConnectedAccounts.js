import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import ConnectTwitterButton from '../ConnectTwitterButton';
import {
  StyledProfileInfoWrapper,
  StyledRoundedImage,
  StyledAccountDetailsInfo,
  StyledNotConnected,
  StyledConnect,
  StyledCenteredDiv,
} from './styles';
import GenericAccount from '../../assets/Pictures/GenericAccount';
import CustomPopper from '../CustomPopper/CustomPopper';
import { withTheme } from 'styled-components';

const ConnectedAccounts = ({ theme }) => {
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <CustomPopper
        open={isOpen}
        style={{ marginRight: '1rem' }}
        placement="bottom-end"
        popper={
          <>
            {renderAccounts()}
            <StyledConnect>
              <ConnectTwitterButton />
            </StyledConnect>
          </>
        }
      >
        <StyledCenteredDiv onClick={() => setIsOpen(!isOpen)}>
          <GenericAccount
            size={35}
            color={theme.pref === 'dark' ? 'white' : '#333'}
          />
        </StyledCenteredDiv>
      </CustomPopper>
    </>
  );
};

export default withTheme(ConnectedAccounts);
