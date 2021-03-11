import React from 'react';
import { useSelector } from 'react-redux';
import TwitterHomeTimeline from '../TwitterHomeTimeline';
import './DashboardStreams.css';

const DashboardStreams = () => {
  const { streams } = useSelector((state) => state.twitterReducer);

  return (
    <div className="dashboardStreams ">
      <div className="streamswrapper pt-05 pb-05">
        {streams &&
          streams.map((stream, idx) => {
            switch (stream) {
              case 'home':
                return <TwitterHomeTimeline key={idx} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
};

export default DashboardStreams;
