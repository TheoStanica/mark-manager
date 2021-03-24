import React, { forwardRef } from 'react';
import { StyledListItemButton } from './styles';

const ListItem = ({ onClick, text, active }, ref) => {
  return (
    <StyledListItemButton ref={ref} onClick={onClick} active={active}>
      {text ? text : 'List Button'}
    </StyledListItemButton>
  );
};

export default forwardRef(ListItem);
