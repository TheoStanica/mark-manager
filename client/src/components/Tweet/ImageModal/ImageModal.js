import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  StyledImageContent,
  StyledImageModal,
  StyledImageWrapper,
} from './styles';

const ImageModal = ({ children, photo }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StyledImageWrapper
        onClick={() => setVisible(true)}
        style={{ marginTop: '1rem' }}
      >
        {children}
      </StyledImageWrapper>
      {visible
        ? ReactDOM.createPortal(
            <StyledImageModal onClick={() => setVisible(false)}>
              <StyledImageContent src={photo} />
            </StyledImageModal>,
            document.body
          )
        : null}
    </>
  );
};

export default ImageModal;
