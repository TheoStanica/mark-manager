import React from 'react';
import ImageModal from './ImageModal/ImageModal';
import { StyledTweetPhoto } from './styles';

const TweetPhoto = ({ media }) => {
  return (
    <ImageModal photo={media.media_url_https}>
      <StyledTweetPhoto
        src={`${media.media_url_https}:small`}
        alt="Tweet photo"
        srcSet={`${media.media_url_https}:small ${media.sizes.small.w}w`}
        loading="lazy"
      />
    </ImageModal>
  );
};

export default TweetPhoto;
