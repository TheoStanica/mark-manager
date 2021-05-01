import React from 'react';
import CardFooter from '../Card/CardFooter';
import Icon from '../Icon/Icon';
import { StyledTweetFooterContainer } from './styles';
import Retweet from '../../assets/Pictures/Retweet';
import Likes from '../../assets/Pictures/Likes';

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
          size={18}
          tooltip={'Retweet'}
          position={'top-start'}
          offset={[0, 5]}
        >
          <Retweet color="#000" />
        </Icon>
        <p style={{ marginLeft: 5, marginRight: 20, fontWeight: 'bold' }}>
          {formatValue(tweet.retweet_count)}
        </p>
        <Icon size={18} tooltip={'Like'} position={'top-start'} offset={[0, 5]}>
          <Likes color="#000" />
        </Icon>
        <p style={{ marginLeft: 5, fontWeight: 'bold' }}>
          {formatValue(tweet.favorite_count)}
        </p>
      </StyledTweetFooterContainer>
    </CardFooter>
  );
};

export default TweetFooter;
