import React, { forwardRef } from 'react';
import './ListItem.css';

const ListItem = ({ onClick, text, active }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`list-item ${active ? 'active' : ''}`}
    >
      {text ? text : 'List Button'}
    </button>
  );
};

export default forwardRef(ListItem);
