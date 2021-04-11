import React from 'react';
import ConnectedAccounts from '../ConnectedAccounts/ConnectedAccounts';
import AddStream from '../AddStream';
import { StyledDashboardMenu } from './styles';
import FilterStreams from '../FilterStreams/FilterStreams';

const DashboardMenu = () => {
  return (
    <StyledDashboardMenu>
      <ConnectedAccounts />
      <AddStream />
      <FilterStreams />
    </StyledDashboardMenu>
  );
};

export default DashboardMenu;
