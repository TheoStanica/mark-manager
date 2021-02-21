import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../redux/actions/twitterActions';
import ModalButton from './ModalButton';
import PostModal from './ModalBody';

const CreateTweet = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <ModalButton
        modalID="createTweet"
        buttonText="New Tweet"
        onClick={() => {
          setMessage('');
        }}
      />
      <PostModal
        id="createTweet"
        submitText="Tweet"
        modalTitle="Create New Teet"
        onSubmit={() => {
          dispatch(tweetNewMessage({ message: message }));
        }}
      >
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={{ height: '200px' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </PostModal>
    </>
  );
};

export default CreateTweet;
