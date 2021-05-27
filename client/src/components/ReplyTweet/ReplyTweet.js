import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import { StyledTextArea } from './styles';

const ReplyTweet = ({ visible, onClose, tweet }) => {
  const [message, setMessage] = useState('');

  const submitReply = (e) => {
    e.stopPropagation();
    console.log('replying..');
    onClose(e);
  };

  return (
    <Modal
      visible={visible}
      onClose={(e) => {
        setMessage('');
        onClose(e);
      }}
      onSubmit={submitReply}
    >
      <ModalHeader>Reply to {tweet.user.name}</ModalHeader>
      <ModalBody>
        Write your message...
        <StyledTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>
    </Modal>
  );
};

export default ReplyTweet;
