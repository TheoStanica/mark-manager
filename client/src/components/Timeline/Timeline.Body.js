import React from 'react';
import './Timeline.css';

const TimelineBody = ({ children }) => {
  return (
    <div className="timeline-body">
      {children}
      <div className="big-box"></div>
    </div>
  );
};

export default TimelineBody;
