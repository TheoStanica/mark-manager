import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../../redux/actions/twitterActions';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import { StyledTextArea } from './styles';

const ReplyTweet = ({ visible, onClose, tweet, twitterUserId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const submitReply = (e) => {
    e.stopPropagation();
    dispatch(
      tweetNewMessage({
        message,
        accounts: Array(twitterUserId),
        inReplyToStatusId: tweet.id_str,
      })
    );
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
        <StyledTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>
    </Modal>
  );
};

export default ReplyTweet;
