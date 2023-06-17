import moment from 'moment';
import React, { useMemo } from 'react';
import {
  ISearchTweetsResponseExtended,
  ITweet,
} from '../../../../../../../api/twitter/types';
import GenericCard from '../GenericCard';
import Retweet from '@mui/icons-material/Sync';
import Content from './Content';
import Footer from './Footer';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../../../../api/user/types';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../core/redux/store';
import useReferencedTweet from '../../../../../hooks/useReferencedTweet';
import {
  CardContent,
  CardHeader,
  Avatar,
  useTheme,
  Theme,
} from '@mui/material';
import { StyleSheet } from '../../../../../../../core/types/stylesheet';

interface Props {
  data: ITweet;
  stream: IStreamPreference<ITwitterStreamData>;
}

const TwitterCard = ({ data, stream }: Props) => {
  const theme = useTheme();
  const { isRetweet, isQuote, isReply } = useReferencedTweet({ tweet: data });

  const tweetAuthorData = useSelector((state: AppState) => {
    const _data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!_data) {
      return undefined;
    }
    return _data._realData.includes.users?.find(
      (user) => user.id === data.author_id
    );
  });

  const referencedTweet = useSelector((state: AppState) => {
    const _data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!_data) {
      return undefined;
    }
    if (
      data.referenced_tweets &&
      data.referenced_tweets.length > 0 &&
      data.referenced_tweets[0]?.id
    ) {
      return _data._realData.includes.tweets?.find(
        (tweet) => tweet.id === data.referenced_tweets![0].id
      );
    }
  });

  const referencedAuthor = useSelector((state: AppState) => {
    const _data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!_data) {
      return undefined;
    }
    if (referencedTweet?.author_id) {
      return _data._realData.includes.users?.find(
        (user) => user.id === referencedTweet.author_id
      );
    }
  });

  const title = useMemo(() => {
    if (!tweetAuthorData) {
      return null;
    }

    if (isRetweet && referencedAuthor) {
      return (
        <div style={titleStyle}>
          <strong>{referencedAuthor.name}</strong> @{referencedAuthor.username}
        </div>
      );
    }

    return (
      <div style={titleStyle}>
        <strong>{tweetAuthorData.name}</strong> @{tweetAuthorData.username}
      </div>
    );
  }, [tweetAuthorData, referencedAuthor, isRetweet]);

  const subHeader = useMemo(() => {
    return moment(new Date(data.created_at)).fromNow();
  }, [data.created_at]);

  const avatar = useMemo(() => {
    if (!tweetAuthorData) {
      return '';
    }

    return tweetAuthorData.profile_image_url || '';
  }, [tweetAuthorData]);

  const beforeHeader = useMemo(() => {
    if (!isRetweet && !isQuote && !isReply) {
      return null;
    }

    if (isRetweet && tweetAuthorData) {
      return (
        <div style={retweet}>
          <Retweet />
          <div>
            <div style={retweetStyle}>{tweetAuthorData.name}</div> retweeted
          </div>
        </div>
      );
    }
    if (isQuote && tweetAuthorData && referencedAuthor && referencedTweet) {
      return (
        <>
          <CardHeader
            sx={styles(theme).header}
            avatar={
              <Avatar
                sx={{ bgcolor: 'lightgray' }}
                src={referencedAuthor?.profile_image_url}
              >
                A
              </Avatar>
            }
            title={
              <div style={{ color: 'gray' }}>
                <strong>{referencedAuthor.name}</strong> @
                {referencedAuthor.username}
              </div>
            }
            subheader={moment(new Date(referencedTweet.created_at)).fromNow()}
          />
          <CardContent sx={styles(theme).content}>
            <div style={container}>
              <div style={line}></div>
              <div style={innerContent}>
                <Content tweet={referencedTweet} stream={stream} simple />
              </div>
            </div>
          </CardContent>
        </>
      );
    }

    if (isReply && tweetAuthorData && referencedAuthor && referencedTweet) {
      return (
        <>
          <CardHeader
            sx={styles(theme).header}
            avatar={
              <Avatar
                sx={{ bgcolor: 'lightgray' }}
                src={referencedAuthor?.profile_image_url}
              >
                A
              </Avatar>
            }
            title={
              <div style={{ color: 'gray' }}>
                <strong>{referencedAuthor.name}</strong> @
                {referencedAuthor.username}
              </div>
            }
            subheader={moment(new Date(referencedTweet.created_at)).fromNow()}
          />
          <CardContent sx={styles(theme).content}>
            <div style={container}>
              <div style={line}></div>
              <div style={innerContent}>
                <Content tweet={referencedTweet} stream={stream} simple />
              </div>
            </div>
          </CardContent>
        </>
      );
    }
    return null;
  }, [
    isQuote,
    isReply,
    isRetweet,
    tweetAuthorData,
    referencedAuthor,
    theme,
    referencedTweet,
    stream,
  ]);

  return (
    <GenericCard
      beforeHeader={beforeHeader}
      title={title}
      subheader={subHeader}
      avatarSrc={avatar}
      content={<Content tweet={data} stream={stream} />}
      footer={<Footer tweet={data} stream={stream} />}
    />
  );
};

const retweet: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: '0.85rem',
  flexDirection: 'row',
};

const titleStyle: React.CSSProperties = {
  // color: '#1DA1F2',
};
const retweetStyle: React.CSSProperties = {
  display: 'inline-block',
  // color: '#1DA1F2',
  fontWeight: 'bold',
};

const line: React.CSSProperties = {
  marginLeft: 18,
  width: 3,
  borderRadius: 10,
  backgroundColor: 'gray',
};

const innerContent: React.CSSProperties = {
  marginLeft: 35,
};

const container: React.CSSProperties = {
  display: 'flex',
};

const styles = (theme: Theme): StyleSheet => ({
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    // background: 'red',
    paddingLeft: 0,
    paddingRight: 0,
  },
  content: {
    paddingTop: theme.spacing(0),
    paddingBottom: '0 !important',
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default TwitterCard;
