import React from 'react';
import './Message.css';

const Message = ({ type, children }) => {
  return (
    <div className={`message-field mt-1 ${type ? type : ''}`}>{children}</div>
  );
};

export default Message;
