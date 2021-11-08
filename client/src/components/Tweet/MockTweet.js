import React from 'react';
import moment from 'moment';
import TweetMessage from './TweetMessage';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import {
  StyledCircleImage,
  StyledHeaderWrapper,
  StyledTweetMetadata,
} from './styles';
import { useSelector } from 'react-redux';
import Icon from '../Icon/Icon';
import { StyledTweetFooterContainer } from './styles';
import Retweet from '../../assets/Pictures/Retweet';
import Likes from '../../assets/Pictures/Likes';
import { withTheme } from 'styled-components';
import CardFooter from '../Card/CardFooter';
import Reply from '../../assets/Pictures/Reply';

const MockedTwitterCard = ({ text, twitterUserId, theme }) => {
  const { twitterAccountsById } = useSelector((state) => state.twitterReducer);

  return (
    <Card style={{ marginBottom: '.3rem', width: '100%', borderRadius: 10 }}>
      <CardHeader
        style={{
          padding: ' .5rem ',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <StyledHeaderWrapper>
          <StyledCircleImage
            src={twitterAccountsById[twitterUserId]?.profileImage}
          />
          <StyledTweetMetadata>
            <div style={{ wordBreak: 'break-word' }}>
              <strong style={{ marginRight: '.5rem' }}>
                {twitterAccountsById[twitterUserId].name}
              </strong>
              @{twitterAccountsById[twitterUserId].screenName}
            </div>
            {moment().fromNow()}
          </StyledTweetMetadata>
        </StyledHeaderWrapper>
      </CardHeader>
      <CardBody style={{ paddingTop: '.5rem', padding: '.5rem' }}>
        <TweetMessage tweet={{ full_text: text }} />
      </CardBody>
      <CardFooter style={{ padding: '.5rem' }}>
        <StyledTweetFooterContainer>
          <Icon
            size={18}
            tooltip={'Retweet'}
            position={'top-start'}
            offset={[0, 5]}
            onClick={() => {}}
          >
            <Retweet color={theme.pref === 'dark' ? 'white' : 'black'} />
          </Icon>
          <p
            style={{
              marginLeft: 5,
              marginRight: 20,
              fontWeight: 'bold',
              fontSize: '.9rem',
              color: theme.pref === 'dark' ? 'white' : 'black',
            }}
          >
            {0}
          </p>
          <Icon
            size={18}
            tooltip={'Like'}
            position={'top-start'}
            offset={[0, 5]}
            onClick={() => {}}
          >
            <Likes color={theme.pref === 'dark' ? 'white' : 'black'} />
          </Icon>
          <p
            style={{
              marginLeft: 5,
              marginRight: 20,
              fontWeight: 'bold',
              color: theme.pref === 'dark' ? 'white' : 'black',
              fontSize: '.9rem',
            }}
          >
            {0}
          </p>
          <Icon
            size={18}
            tooltip={'Reply'}
            position={'top-start'}
            offset={[0, 5]}
            onClick={() => {}}
          >
            <Reply color={theme.pref === 'dark' ? 'white' : 'black'} />
          </Icon>
        </StyledTweetFooterContainer>
      </CardFooter>
    </Card>
  );
};

export default React.memo(withTheme(MockedTwitterCard));
