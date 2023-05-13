import moment from 'moment';
import React, { useMemo } from 'react';
import GenericCard from '../GenericCard';
import {
  IFacebookStreamData,
  IStreamPreference,
} from '../../../../../../../api/user/types';
import { IFacebookPageFeedData } from '../../../../../../../api/facebook/types';
import Footer from './Footer';
import Content from './Content';

interface Props {
  data: IFacebookPageFeedData;
  stream: IStreamPreference<IFacebookStreamData>;
}

const FacebookCard = ({ data, stream }: Props) => {
  const title = useMemo(() => {
    return (
      <div style={titleStyle}>
        <strong>{data.from.name}</strong>
      </div>
    );
  }, [data.from.name]);

  const avatar = useMemo(() => {
    return data.from.picture.data.url;
  }, [data.from.picture.data.url]);

  return (
    <GenericCard
      title={title}
      avatarSrc={avatar}
      subheader={moment(new Date(data.created_time)).fromNow()}
      content={<Content message={data.message} />}
      // content={<p>{data.message}</p>}
      footer={<Footer data={data} stream={stream} />}
    />
  );
};

const titleStyle: React.CSSProperties = {
  // color: '#1DA1F2',
};

export default FacebookCard;
