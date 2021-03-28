import React from 'react';
import { StyledListMenu } from './styles';

const ListMenu = ({ children, style }) => {
  return <StyledListMenu style={style}>{children}</StyledListMenu>;
};

export default ListMenu;
