import React from 'react';
import moment from 'moment';
import TweetMessage from './TweetMessage';

const TwitterCard = ({ tweet }) => {
  return (
    <div className="card my-1">
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className="d-flex">
            <img
              className="rounded-circle me-2"
              src={tweet.user.profile_image_url}
              alt={`${tweet.user.name}'s profile`}
            />
            <div className="d-flex flex-column">
              <div>
                <strong className="me-1"> {tweet.user.name}</strong>@
                {tweet.user.screen_name}
              </div>
              {moment(new Date(tweet.created_at)).fromNow()}
            </div>
          </div>
        </div>
        <TweetMessage tweet={tweet} />
      </div>
    </div>
  );
};

export default TwitterCard;
