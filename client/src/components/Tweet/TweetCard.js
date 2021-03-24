import React from 'react';
import moment from 'moment';
import TweetMessage from './TweetMessage';
import TweetMedia from './TweetMedia';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import {
  StyledCircleImage,
  StyledHeaderWrapper,
  StyledTweetMetadata,
} from './styles';

const TwitterCard = ({ tweet }) => {
  let MediaComponent = null;

  if (tweet.entities && tweet.entities.media) {
    MediaComponent = <TweetMedia entities={tweet.entities} />;
  }

  return (
    <Card style={{ marginBottom: '.5rem' }}>
      <CardHeader style={{ padding: '.7rem .7rem .5rem .7rem' }}>
        <StyledHeaderWrapper>
          <StyledCircleImage
            src={tweet.user.profile_image_url}
            alt={`${tweet.user.name}'s profile`}
          />
          <StyledTweetMetadata>
            <div>
              <strong style={{ marginRight: '.5rem' }}>
                {tweet.user.name}
              </strong>
              @{tweet.user.screen_name}
            </div>
            {moment(new Date(tweet.created_at)).fromNow()}
          </StyledTweetMetadata>
        </StyledHeaderWrapper>
      </CardHeader>
      <CardBody style={{ paddingTop: '.5rem', padding: '.5rem' }}>
        <TweetMessage tweet={tweet} />
        {MediaComponent}
      </CardBody>
    </Card>
  );
};

export default TwitterCard;
