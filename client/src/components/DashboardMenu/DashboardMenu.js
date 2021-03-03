import React from 'react';
import { useSelector } from 'react-redux';
import ClearButton from '../ClearButton/ClearButton';
import ConnectTwitterButton from '../ConnectTwitterButton';
import './DashboardMenu.css';

const DashboardMenu = () => {
  const { isconnected } = useSelector((state) => state.twitterReducer);

  return (
    <div className="dashboard-menu">
      <ClearButton>Add Stream</ClearButton>
      {isconnected ? <ConnectTwitterButton /> : null}
    </div>
  );
};

export default DashboardMenu;
