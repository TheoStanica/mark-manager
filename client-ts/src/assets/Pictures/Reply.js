import React from 'react';

const Reply = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.8 0H2.2C0.9867 0 0 0.9867 0 2.2V22L5.8663 17.6H19.8C21.0133 17.6 22 16.6133 22 15.4V2.2C22 0.9867 21.0133 0 19.8 0ZM19.8 15.4H5.1337L2.2 17.6V2.2H19.8V15.4Z"
      fill={color ? color : '#000'}
    />
  </svg>
);

export default Reply;
