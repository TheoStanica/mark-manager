import React from 'react';
import './ListMenu.css';

const ListMenu = ({ children, className }) => {
  return <div className={`list-menu ${className}`}>{children}</div>;
};

export default ListMenu;
