import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  StyledImageContent,
  StyledImageModal,
  StyledImageWrapper,
} from './styles';

const ImageModal = ({ children, modalContent }) => {
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
              <StyledImageContent src={modalContent} />
            </StyledImageModal>,
            document.body
          )
        : null}
    </>
  );
};

export default ImageModal;
