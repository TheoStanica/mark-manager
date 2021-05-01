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
import TweetFooter from './TweetFooter';
import TweetQuote from './TweetQuote';
import RetweetHeader from './RetweetHeader';

const TwitterCard = ({ tweet }) => {
  let data = tweet;
  let isRT = false;
  let MediaComponent = null;
  let QuoteComponent = null;

  if (tweet.retweeted_status) {
    data = tweet.retweeted_status;
    isRT = true;
  }

  if (tweet.entities && tweet.entities.media) {
    MediaComponent = <TweetMedia entities={tweet.entities} />;
  }
  if (tweet.quoted_status) {
    QuoteComponent = <TweetQuote data={tweet.quoted_status} />;
  }

  return (
    <Card style={{ marginBottom: '.3rem' }}>
      <CardHeader style={{ padding: ' .5rem ' }}>
        {isRT ? <RetweetHeader tweet={tweet} /> : null}
        <StyledHeaderWrapper>
          <StyledCircleImage
            src={data.user.profile_image_url_https}
            alt={`${data.user.name}'s profile`}
          />
          <StyledTweetMetadata>
            <div style={{ wordBreak: 'break-word' }}>
              <strong style={{ marginRight: '.5rem' }}>{data.user.name}</strong>
              @{data.user.screen_name}
            </div>
            {moment(new Date(data.created_at)).fromNow()}
          </StyledTweetMetadata>
        </StyledHeaderWrapper>
      </CardHeader>
      <CardBody style={{ paddingTop: '.5rem', padding: '.5rem' }}>
        <TweetMessage tweet={data} />
        {MediaComponent}
        {QuoteComponent}
      </CardBody>
      <TweetFooter tweet={data} />
    </Card>
  );
};

export default React.memo(TwitterCard);
