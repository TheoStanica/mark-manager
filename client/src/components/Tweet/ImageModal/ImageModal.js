import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  StyledImageContent,
  StyledImageModal,
  StyledImageWrapper,
} from './styles';

const ImageModal = ({ children, photo }) => {
  const [visible, setVisible] = useState(false);

  const changeVisibleStatus = (e) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <>
      <StyledImageWrapper
        onClick={changeVisibleStatus}
        style={{ marginTop: '1rem' }}
      >
        {children}
      </StyledImageWrapper>
      {visible
        ? ReactDOM.createPortal(
            <StyledImageModal onClick={changeVisibleStatus}>
              <StyledImageContent src={photo} />
            </StyledImageModal>,
            document.body
          )
        : null}
    </>
  );
};

export default ImageModal;
