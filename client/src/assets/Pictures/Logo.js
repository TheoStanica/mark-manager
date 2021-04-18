import React from 'react';

const Likes = ({ bgColor, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="23"
      cy="23"
      r="22"
      fill={bgColor ? bgColor : '#068abc00'}
      fillOpacity="1"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M34.08 9.8L23.244 28.484L12.3 9.8H10.104V35H12.66V14.948L22.56 31.796H23.82L33.72 14.84V35H36.276V9.8H34.08Z"
      fill="white"
    />
  </svg>
);

export default Likes;
