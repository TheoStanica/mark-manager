import React from 'react';

const Mark = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1980 2072"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="990"
        cy="1036"
        r="948"
        stroke="url(#paint0_linear_802_2)"
        strokeWidth="84"
      />
      <path
        d="M1504 455L992.3 1337.3L475.5 455H371.8V1645H492.5V698.1L960 1493.7H1019.5L1487 693V1645H1607.7V455H1504Z"
        fill="url(#paint1_linear_802_2)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_802_2"
          x1="282"
          y1="372.5"
          x2="1727"
          y2="1734.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7E84FF" />
          <stop offset="1" stopColor="#75FAC8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_802_2"
          x1="1601.5"
          y1="1645"
          x2="365"
          y2="489.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#75FAC8" />
          <stop offset="1" stopColor="#7E84FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Mark;
