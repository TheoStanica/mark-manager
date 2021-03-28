import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import { StyledModalWrapper, StyledModal } from './styles';

const Modal = ({ children, visible, onClose, onSubmit }) => {
  return (
    <StyledModal visible={visible}>
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
    </StyledModal>
  );
};

export default Modal;
