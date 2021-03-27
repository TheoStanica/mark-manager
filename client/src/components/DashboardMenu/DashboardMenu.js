import React from 'react';
import ConnectedAccounts from '../ConnectedAccounts/ConnectedAccounts';
import AddStream from '../AddStream';
import { StyledDashboardMenu } from './styles';

const DashboardMenu = () => {
  return (
    <StyledDashboardMenu>
      <ConnectedAccounts />
      <AddStream />
    </StyledDashboardMenu>
  );
};

export default DashboardMenu;
