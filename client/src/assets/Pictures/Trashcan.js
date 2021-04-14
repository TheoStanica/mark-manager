import React from 'react';

const Trashcan = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.33333 6H5.55556V16.4C5.55556 16.8243 5.71944 17.2313 6.01117 17.5314C6.30289 17.8314 6.69855 18 7.11111 18H14.8889C15.3014 18 15.6971 17.8314 15.9888 17.5314C16.2806 17.2313 16.4444 16.8243 16.4444 16.4V6H6.33333ZM14.5918 3.6L13.3333 2H8.66667L7.40822 3.6H4V5.2H18V3.6H14.5918Z"
      fill={color ? color : '#000'}
    />
  </svg>
);

export default Trashcan;
