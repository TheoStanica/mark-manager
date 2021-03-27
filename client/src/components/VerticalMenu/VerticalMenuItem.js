import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import { StyledMenuItem } from './styles';

const VerticalMenuItem = ({ text, offset, onClick, children }) => {
  return (
    <ToolTip text={text} offset={offset}>
      <StyledMenuItem onClick={onClick}>{children}</StyledMenuItem>
    </ToolTip>
  );
};

export default VerticalMenuItem;
