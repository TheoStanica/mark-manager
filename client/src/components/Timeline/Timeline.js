import React from 'react';
import './Timeline.css';

const Timeline = ({ children, id }) => {
  return (
    <div className="timeline ml-05" key={id}>
      {children}
    </div>
  );
};

export default Timeline;
