import React from 'react';
import ToolTip from '../ToolTip/ToolTip';
import { StyledIcon } from './styles';

const Icon = (
  { size, style, icon, tooltip, position, offset, onClick, children },
  ref
) => {
  const renderIcon = (style, icon, onClick) => {
    return (
      <StyledIcon
        style={{
          height: size + 'px',
          width: size + 'px',
          ...style,
        }}
        onClick={onClick}
        ref={ref}
      >
        {icon ? <img src={icon} alt={icon} /> : null}
        {children ? children : null}
      </StyledIcon>
    );
  };

  return tooltip ? (
    <ToolTip text={tooltip} position={position} offset={offset}>
      {renderIcon(style, icon, onClick)}
    </ToolTip>
  ) : (
    renderIcon(style, icon, onClick)
  );
};

export default React.forwardRef(Icon);
