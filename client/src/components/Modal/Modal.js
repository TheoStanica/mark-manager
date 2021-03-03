import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import CardFooter from '../Card/Card.Footer';
import './Modal.css';

const Modal = ({ children, visible, onClose, onSubmit }) => {
  return (
    <div className={`modal ${visible ? '' : 'closed'}`}>
      <div className="modal-wrapper ">
        <Card>
          {children}
          <CardFooter>
            <Button className="mr-1" onClick={onClose}>
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
