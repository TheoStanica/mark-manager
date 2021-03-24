import React from 'react';
import { StyledPopover, StyledPopup, StyledPopupWrapper } from './styles';

const Popover = ({ children, content }) => {
  return (
    <StyledPopover>
      {children}
      <StyledPopupWrapper>
        <StyledPopup>{content}</StyledPopup>
      </StyledPopupWrapper>
    </StyledPopover>
  );
};

export default Popover;
