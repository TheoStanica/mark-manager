import moment from 'moment';
import React, { useMemo } from 'react';
import { ITweet } from '../../../../../../../api/twitter/types';
import GenericCard from '../GenericCard';
import Retweet from '@mui/icons-material/Sync';
import Content from './Content';
import Footer from './Footer';

interface Props {
  data: ITweet;
}

const TwitterCard = ({ data }: Props) => {
  const isRetweet = useMemo(() => {
    if (data.retweeted_status) {
      return true;
    }
    return false;
  }, [data.retweeted_status]);

  const beforeHeader = useMemo(() => {
    if (isRetweet) {
      return (
        <div style={retweet}>
          <Retweet />
          <div>
            <div style={retweetStyle}>{data.user.name}</div> retweeted
          </div>
        </div>
      );
    }
    return null;
  }, [data.user.name, isRetweet]);

  const title = useMemo(() => {
    if (isRetweet) {
      return (
        <div style={titleStyle}>
          <strong>{data.retweeted_status!.user.name}</strong> @
          {data.retweeted_status!.user.screen_name}
        </div>
      );
    }
    return (
      <div style={titleStyle}>
        <strong>{data.user.name}</strong> @{data.user.screen_name}
      </div>
    );
  }, [data.retweeted_status, data.user.name, data.user.screen_name, isRetweet]);

  const subHeader = useMemo(() => {
    if (isRetweet) {
      return moment(new Date(data.retweeted_status!.created_at)).fromNow();
    }
    return moment(new Date(data.created_at)).fromNow();
  }, [isRetweet, data.created_at, data.retweeted_status]);

  const avatar = useMemo(() => {
    if (isRetweet) {
      return data.retweeted_status!.user.profile_image_url_https;
    }
    return data.user.profile_image_url_https;
  }, [data.retweeted_status, data.user.profile_image_url_https, isRetweet]);

  return (
    <GenericCard
      beforeHeader={beforeHeader}
      title={title}
      subheader={subHeader}
      avatarSrc={avatar}
      content={<Content tweet={data} isRetweet={isRetweet} />}
      footer={<Footer tweet={data} isRetweet={isRetweet} />}
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

export default TwitterCard;
