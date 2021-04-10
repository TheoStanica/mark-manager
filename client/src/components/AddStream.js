import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStream } from '../redux/actions/twitterActions';
import ClearButton from './ClearButton/ClearButton';
import ConnectedAccountsDropdown from './ConnectedAccountsDropdown/ConnectedAccountsDropdown';
import Modal from './Modal/Modal';
import ModalBody from './Modal/ModalBody';
import ModalHeader from './Modal/ModalHeader';
import StreamTypesDropdown from './StreamTypesDropdown/StreamTypesDropdown';
import InputField from './InputField/InputField';
import { setErrors } from '../redux/actions/errorsActions';
import DisplayErrors from './DisplayErrors';

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
      <ClearButton onClick={() => setModalVisible(true)}>
        Add Stream
      </ClearButton>
      <Modal
        visible={modalVisible}
        onClose={resetModal}
        onSubmit={handleSubmit}
      >
        <ModalHeader>Add New Stream</ModalHeader>
        <ModalBody>
          <div style={{ width: 500, marginBottom: 60 }}>
            <p style={{ marginBottom: 5 }}>Select an account:</p>
            <ConnectedAccountsDropdown
              reset={reset}
              onSelected={(selected) => setSelectedAccount(selected)}
              isMulti={false}
            />
            <p style={{ margin: '10px 0' }}>Select stream type:</p>
            <StreamTypesDropdown
              reset={reset}
              onSelected={(stream) => {
                setStreamType(stream);
              }}
            />
            {streamType === 'search' && (
              <InputField
                id="searchTerm"
                type="text"
                required={true}
                label="Search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginTop: 10 }}
              />
            )}
          </div>
          <DisplayErrors />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddStream;
