import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading d-flex flex-column justify-content-center align-items-center">
      <img src="/Loading.svg" alt="Loading spinner" />
      Loading...
    </div>
  );
};

export default Loading;
