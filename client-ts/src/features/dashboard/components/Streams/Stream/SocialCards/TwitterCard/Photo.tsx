import { Dialog } from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  ISearchTweetsResponseExtended,
  ITweet,
} from '../../../../../../../api/twitter/types';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../../core/redux/store';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../../../../api/user/types';

interface Props {
  stream: IStreamPreference<ITwitterStreamData>;
  tweet?: ITweet;
}
const Photo = ({ stream, tweet }: Props) => {
  const [visible, setVisible] = useState(false);

  const mediaObject = useSelector((state: AppState) => {
    const _data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!_data) {
      return undefined;
    }
    if (
      tweet &&
      tweet?.attachments?.media_keys &&
      tweet?.attachments?.media_keys.length > 0 &&
      _data._realData.includes.media
    ) {
      return _data._realData.includes.media?.find(
        (media) => media.media_key === tweet?.attachments?.media_keys[0]
      );
    }
  });

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  if (!mediaObject) {
    return null;
  }
  return (
    <>
      <Dialog onClose={onClose} open={visible}>
        <img style={dialogimg} src={mediaObject.url} alt="Tweet" />
      </Dialog>
      {mediaObject.type === 'photo' && (
        <img
          style={imgStyle}
          src={mediaObject.url}
          srcSet={mediaObject.url}
          loading="lazy"
          alt="Tweet"
          onClick={() => setVisible(true)}
        />
      )}
      {/* {mediaObject.type === 'video' && <video src={mediaObject.url} />} */}
    </>
  );
};

const imgStyle: React.CSSProperties = {
  width: '100%',
  maxHeight: '250px',
  objectFit: 'cover',
  marginTop: '8px',
};

const dialogimg: React.CSSProperties = {
  objectFit: 'contain',
};

export default Photo;
