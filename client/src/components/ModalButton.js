import React from 'react';

const ModalButton = ({ onClick, buttonText, modalID }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={`#${modalID}`}
      onClick={onClick}
    >
      {buttonText ? buttonText : 'Open Modal'}
    </button>
  );
};

export default ModalButton;
