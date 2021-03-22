import React from 'react';
import './DashboardMenu.css';
import ConnectedAccounts from '../ConnectedAccounts/ConnectedAccounts';
import AddStream from '../AddStream';

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <ConnectedAccounts />
      <AddStream />
    </div>
  );
};

export default DashboardMenu;
