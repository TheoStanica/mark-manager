import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import CardBody from '../Card/Card.Body';
import ClearButton from '../ClearButton/ClearButton';
import ConnectTwitterButton from '../ConnectTwitterButton';
import Popover from '../Popover/Popover';

const ConnectedAccounts = () => {
  const { isConnected, name, screenName, profileImage } = useSelector(
    (state) => state.twitterReducer
  );

  const renderAccounts = () => {
    return isConnected ? (
      <div className="d-flex">
        <Card>
          <CardBody className="d-flex align-items-start">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle mr-1"
                src={profileImage}
                alt={profileImage}
              />
              <div className="d-flex flex-column">
                Twitter
                <div>
                  <strong className="mr-05"> {name}</strong>@{screenName}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    ) : (
      <div
        className="d-flex justify-content-center mb-05 mt-05"
        style={{ minWidth: 300 }}
      >
        No accounts connected
      </div>
    );
  };

  return (
    <Popover
      content={
        <>
          {renderAccounts()}
          <div className="divider mb-05 "></div>
          <div className="d-flex justify-content-center mb-05">
            <ConnectTwitterButton />
          </div>
        </>
      }
    >
      <ClearButton>Accounts</ClearButton>
    </Popover>
  );
};

export default ConnectedAccounts;
