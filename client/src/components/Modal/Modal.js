import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import { StyledModalWrapper, StyledModal } from './styles';

const Modal = ({ children, visible, onClose, onSubmit }) => {
  return visible
    ? ReactDOM.createPortal(
        <StyledModal visible={visible} onClick={(e) => e.stopPropagation()}>
          <StyledModalWrapper className="modal-wrapper ">
            <Card>
              {children}
              <CardFooter>
                <Button style={{ marginRight: '1rem' }} onClick={onClose}>
                  Close
                </Button>
                <Button onClick={onSubmit}>Submit</Button>
              </CardFooter>
            </Card>
          </StyledModalWrapper>
        </StyledModal>,
        document.body
      )
    : null;
};

export default Modal;
