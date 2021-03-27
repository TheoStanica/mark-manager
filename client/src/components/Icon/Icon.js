import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import { StyledIcon } from './styles';

const Icon = ({ size, style, icon, tooltip, onClick }) => {
  return (
    <ToolTip text={tooltip}>
      <StyledIcon
        style={{ height: size + 'px', width: size + 'px', ...style }}
        onClick={onClick}
      >
        <img src={icon} alt={icon} />
      </StyledIcon>
    </ToolTip>
  );
};

export default Icon;
