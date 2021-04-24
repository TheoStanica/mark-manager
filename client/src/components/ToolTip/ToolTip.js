import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import {
  StyledMkToolTip,
  StyledMkToolTipSpan,
  StyledCenteredDiv,
} from './styles';

const ToolTip = ({ children, text, offset, position }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position ? position : 'auto',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offset ? offset : [0, 5],
          preventOverflow: { enabled: true },
        },
      },
    ],
  });

  const tooltip = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    tooltip.current.addEventListener('mouseover', () => {
      setIsOpen(true);
    });
    tooltip.current.addEventListener('mouseout', () => {
      setIsOpen(false);
    });
  }, []);

  return (
    <>
      {isOpen
        ? ReactDOM.createPortal(
            <StyledMkToolTipSpan
              ref={setPopperElement}
              style={{ zIndex: 10000, ...styles.popper }}
              {...attributes.popper}
            >
              {text}
            </StyledMkToolTipSpan>,
            document.body
          )
        : null}

      <StyledCenteredDiv ref={tooltip}>
        <StyledMkToolTip ref={setReferenceElement}>{children}</StyledMkToolTip>
      </StyledCenteredDiv>
    </>
  );
};

export default ToolTip;
