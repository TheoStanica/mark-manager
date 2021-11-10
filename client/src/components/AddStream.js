import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStream } from '../redux/actions/twitterActions';
import ConnectedAccountsDropdown from './ConnectedAccountsDropdown/ConnectedAccountsDropdown';
import Modal from './Modal/Modal';
import ModalBody from './Modal/ModalBody';
import ModalHeader from './Modal/ModalHeader';
import StreamTypesDropdown from './StreamTypesDropdown/StreamTypesDropdown';
import InputField from './InputField/InputField';
import { setErrors } from '../redux/actions/errorsActions';
import DisplayErrors from './DisplayErrors';
import Icon from './Icon/Icon';
import PlusSign from '../assets/Pictures/PlusSign';
import styled from 'styled-components';
import TrendingPanel from './TrendingPanel/TrendingPanel';
import { Typography } from '@mui/material';

const AddStream = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [reset, setReset] = useState(false);
  const [streamType, setStreamType] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const resetModal = () => {
    setModalVisible(false);
    setSelectedAccount(null);
    setSearchTerm('');
    setStreamType(null);
    setReset(true);
  };
  const dispatchErrorMessage = (message) => {
    dispatch(setErrors({ errors: [{ message: message }] }));
  };

  const handleSubmit = () => {
    if (!selectedAccount) {
      dispatchErrorMessage('Please select an account');
    } else if (!streamType) {
      dispatchErrorMessage('Please select a stream type');
    } else if (streamType === 'search' && searchTerm === '') {
      dispatchErrorMessage('Please enter a search term');
    } else {
      switch (streamType) {
        case 'home_timeline':
          dispatch(
            addStream({
              type: 'home_timeline',
              twitterUserId: selectedAccount,
            })
          );
          break;
        case 'search':
          dispatch(
            addStream({
              type: 'search',
              search: searchTerm,
              twitterUserId: selectedAccount,
            })
          );
          break;
        default:
          break;
      }
      resetModal();
    }
  };

  return (
    <>
      <StyledStickyBottomRight>
        <Icon onClick={() => setModalVisible(true)}>
          <PlusSign size={64} />
        </Icon>
      </StyledStickyBottomRight>
      <Modal
        visible={modalVisible}
        onClose={resetModal}
        onSubmit={handleSubmit}
      >
        <ModalHeader>Add New Stream</ModalHeader>
        <ModalBody>
          <StyledModalWrapper streamType={streamType}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Typography variant="h6" mb={2}>
                Select account:
              </Typography>
              <ConnectedAccountsDropdown
                reset={reset}
                onSelected={(selected) => setSelectedAccount(selected)}
                isMulti={false}
              />
              {selectedAccount && (
                <>
                  <Typography variant="h6" mt={2} mb={2}>
                    Select stream type:
                  </Typography>
                  <StreamTypesDropdown
                    reset={reset}
                    onSelected={(stream) => {
                      setStreamType(stream);
                    }}
                  />
                </>
              )}
              {streamType === 'search' && (
                <InputField
                  id="searchTerm"
                  type="text"
                  required={true}
                  label="Search term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginTop: 25 }}
                />
              )}
            </div>
            <TrendingPanel
              isVisible={streamType === 'search' ? true : false}
              twitterUserId={selectedAccount}
              onSelectedTrend={(term) => setSearchTerm(term)}
            />
          </StyledModalWrapper>
          <DisplayErrors />
        </ModalBody>
      </Modal>
    </>
  );
};

const StyledStickyBottomRight = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 100;
`;
const StyledModalWrapper = styled.div`
  // width: streamType === 'search' ? 900 : 500,
  display: flex;
  justify-content: center;
  width: ${(props) => (props.streamType === 'search' ? '900px' : '500px')};
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    width: 500px;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export default AddStream;
