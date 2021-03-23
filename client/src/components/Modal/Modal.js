import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import './Modal.css';

const Modal = ({ children, visible, onClose, onSubmit }) => {
  return (
    <div className={`modal ${visible ? '' : 'closed'}`}>
      <div className="modal-wrapper ">
        <Card>
          {children}
          <CardFooter>
            <Button style={{ marginRight: '1rem' }} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
