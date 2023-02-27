import { Dialog } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { ITweetMediaEntity } from '../../../../../../../api/twitter/types';

interface Props {
  media?: Array<ITweetMediaEntity>;
}
const Photo = ({ media }: Props) => {
  const [visible, setVisible] = useState(false);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  if (!media?.length) {
    return null;
  }

  return (
    <>
      <Dialog onClose={onClose} open={visible}>
        <img style={dialogimg} src={media[0].media_url_https} alt="Tweet" />
      </Dialog>
      <img
        style={imgStyle}
        src={`${media[0].media_url_https}:small`}
        srcSet={`${media[0].media_url_https}:small ${media[0].sizes.small.w}w`}
        loading="lazy"
        alt="Tweet"
        onClick={() => setVisible(true)}
      />
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
