import React from 'react';
import moment from 'moment';
import TweetMessage from './TweetMessage';
import TweetMedia from './TweetMedia';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import './Tweet.css';

const TwitterCard = ({ tweet }) => {
  let MediaComponent = null;

  if (tweet.entities && tweet.entities.media) {
    MediaComponent = <TweetMedia entities={tweet.entities} />;
  }

  return (
    <Card className="mb-05">
      <CardHeader className="pb-05">
        <div className="d-flex align-items-start">
          <div className="d-flex">
            <img
              className="rounded-circle mr-1"
              src={tweet.user.profile_image_url}
              alt={`${tweet.user.name}'s profile`}
            />
            <div className="d-flex flex-column">
              <div>
                <strong className="mr-05"> {tweet.user.name}</strong>@
                {tweet.user.screen_name}
              </div>
              {moment(new Date(tweet.created_at)).fromNow()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-05">
        <TweetMessage tweet={tweet} />
        {MediaComponent}
      </CardBody>
    </Card>
  );
};

export default TwitterCard;
