import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { StyledCenteredDiv, StyledWrapper } from './styles';

const CustomPopper = ({ children, popper, open, onClick, placement }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ? placement : 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });
  return (
    <>
      {open
        ? ReactDOM.createPortal(
            <StyledWrapper
              ref={setPopperElement}
              style={{ zIndex: 10000, ...styles.popper }}
              {...attributes.popper}
            >
              {popper}
            </StyledWrapper>,
            document.body
          )
        : null}

      <StyledCenteredDiv ref={setReferenceElement} onClick={onClick}>
        {children}
      </StyledCenteredDiv>
    </>
  );
};

export default CustomPopper;
