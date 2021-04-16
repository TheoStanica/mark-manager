import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
  StyledWrapper,
} from './styles';
import GenericAccount from '../../assets/Pictures/GenericAccount';
import { usePopper } from 'react-popper';

const ConnectedAccounts = () => {
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

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
      {isOpen
        ? ReactDOM.createPortal(
            <StyledWrapper
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {renderAccounts()}
              <StyledConnect>
                <ConnectTwitterButton />
              </StyledConnect>
            </StyledWrapper>,
            document.body
          )
        : null}

      <StyledCenteredDiv
        style={{ marginRight: '1rem' }}
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
      >
        <GenericAccount size={35} color="#333" />
      </StyledCenteredDiv>
    </>
  );
};

export default ConnectedAccounts;
