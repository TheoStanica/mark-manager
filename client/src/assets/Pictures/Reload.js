import React from 'react';

const Refresh = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.6334 19.1967C27.47 14.8925 26.0697 9.81795 22.2832 7.06623C17.3335 3.46596 10.5009 5.03067 7.5258 10.1545L5.1516 8.81124C5.0197 8.73661 4.85635 8.86184 4.87582 9.01977L5.70017 15.9395C5.71535 16.057 5.83489 16.1246 5.94336 16.0771L12.2993 13.2198C12.4447 13.1551 12.4638 12.9483 12.336 12.876L9.96596 11.5351C12.0735 7.94458 16.7985 6.78715 20.3435 9.11931C23.3943 11.1229 24.5042 15.1625 22.9128 18.4465C21.2265 21.9271 17.2115 23.4263 13.7484 22.1417C13.1054 21.9031 12.3852 22.1758 12.0494 22.7693C11.6319 23.5071 11.9608 24.455 12.7557 24.7523C17.6832 26.5934 23.4378 24.3372 25.6334 19.1967Z"
      fill={color ? color : '#000'}
    />
  </svg>
);

export default Refresh;