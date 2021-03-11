import React from 'react';
import './DashboardMenu.css';
import ConnectedAccounts from '../ConnectedAccounts/ConnectedAccounts';

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <ConnectedAccounts />
    </div>
  );
};

export default DashboardMenu;
