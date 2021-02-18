import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tweetNewMessage } from '../redux/actions/twitterActions';

const PostModal = () => {
  const [postMessage, setPostMessage] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      {/* the button to open tweet modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#postModal"
        onClick={() => setPostMessage('')}
      >
        Create Tweet
      </button>
      {/* the actual modal */}
      <div className="modal" tabIndex="-1" id="postModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create new Tweet</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                style={{ height: '200px' }}
                value={postMessage}
                onChange={(e) => setPostMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() =>
                  dispatch(tweetNewMessage({ message: postMessage }))
                }
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
