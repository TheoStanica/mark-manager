import React from 'react';
import './Loading.css';
import { Assets } from '../../assets';

const Loading = () => {
  return (
    <div className="loading d-flex flex-column justify-content-center align-items-center">
      <img src={Assets.Pictures.Loading} alt="Loading spinner" />
      Loading...
    </div>
  );
};

export default Loading;
