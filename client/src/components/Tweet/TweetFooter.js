import React from 'react';
import { Assets } from '../../assets';
import CardFooter from '../Card/CardFooter';
import Icon from '../Icon/Icon';
import { StyledTweetFooterContainer } from './styles';

const TweetFooter = ({ tweet }) => {
  const formatValue = (count) => {
    return Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(count);
  };

  return (
    <CardFooter style={{ padding: '.5rem' }}>
      <StyledTweetFooterContainer>
        <Icon
          icon={Assets.Pictures.Retweet}
          size={18}
          tooltip={'Retweet'}
          position={'top'}
        />
        <p style={{ marginLeft: 5, marginRight: 20, fontWeight: 'bold' }}>
          {formatValue(tweet.retweet_count)}
        </p>
        <Icon
          icon={Assets.Pictures.Likes}
          size={18}
          tooltip={'Like'}
          position={'top'}
        />
        <p style={{ marginLeft: 5, fontWeight: 'bold' }}>
          {formatValue(tweet.favorite_count)}
        </p>
      </StyledTweetFooterContainer>
    </CardFooter>
  );
};

export default TweetFooter;
