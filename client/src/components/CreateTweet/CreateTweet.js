import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../../redux/actions/twitterActions';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import { StyledTextarea } from './styles';

const CreateTweet = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      onClose={() => {
        setMessage('');
        onClose();
      }}
      onSubmit={() => {
        dispatch(tweetNewMessage({ message: message }));
        onClose();
      }}
    >
      <ModalHeader>Create New Tweet</ModalHeader>
      <ModalBody>
        <StyledTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>
    </Modal>
  );
};

export default CreateTweet;
