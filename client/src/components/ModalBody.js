import React from 'react';

const ModalBody = ({ children, onSubmit, submitText, modalTitle, id }) => {
  return (
    <div className="modal" tabIndex="-1" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modalTitle ? modalTitle : 'New Modal'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={onSubmit}
            >
              {submitText ? submitText : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBody;
