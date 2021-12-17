import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../../redux/actions/twitterActions';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import { StyledTextarea } from './styles';
import ConnectedAccountsDropdown from '../ConnectedAccountsDropdown/ConnectedAccountsDropdown';
import DisplayErrors from '../DisplayErrors';
import { resetErrors, setErrors } from '../../redux/actions/errorsActions';

const CreateTweet = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [resetDropdown, setResetDropdown] = useState(false);
  const dispatch = useDispatch();

  const dispatchErrorMessage = (message) => {
    dispatch(setErrors({ errors: [{ message: message }] }));
  };

  useEffect(() => {
    if (!visible) {
      dispatch(resetErrors());
      setResetDropdown(true);
      setAccounts([]);
    } else {
      setResetDropdown(false);
    }
  }, [dispatch, visible]);

  const postTweet = () => {
    if (accounts.length < 1) {
      dispatchErrorMessage('Please select an account');
    } else if (message.length < 1) {
      dispatchErrorMessage('Please enter a message');
    } else if (message.length > 280) {
      dispatchErrorMessage(
        'Message is too long. Please enter a message that has less than 280 characters.'
      );
    } else {
      dispatch(tweetNewMessage({ message: message, accounts })).then(() =>
        onClose()
      );
      setMessage('');
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={() => {
        setMessage('');
        onClose();
      }}
      onSubmit={postTweet}
    >
      <ModalHeader>Create New Tweet</ModalHeader>
      <ModalBody>
        Select an account:
        <ConnectedAccountsDropdown
          reset={resetDropdown}
          onSelected={(selected) => setAccounts(selected)}
          isMulti={true}
        />
        <StyledTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <DisplayErrors />
      </ModalBody>
    </Modal>
  );
};

export default CreateTweet;
