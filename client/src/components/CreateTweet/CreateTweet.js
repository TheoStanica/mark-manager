import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../../redux/actions/twitterActions';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/Modal.Body';
import ModalHeader from '../Modal/Modal.Header';
import './CreateTweet.css';

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
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>
    </Modal>
  );
};

export default CreateTweet;
