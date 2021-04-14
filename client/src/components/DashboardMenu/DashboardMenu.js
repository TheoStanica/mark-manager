import React from 'react';
import ConnectedAccounts from '../ConnectedAccounts/ConnectedAccounts';
import AddStream from '../AddStream';
import { StyledDashboardMenu, StyledHeader } from './styles';
import FilterStreams from '../FilterStreams/FilterStreams';

const DashboardMenu = () => {
  return (
    <StyledDashboardMenu>
      <StyledHeader>Dashboard</StyledHeader>
      <div style={{ display: 'flex' }}>
        <AddStream />
        <ConnectedAccounts />
        <FilterStreams />
      </div>
    </StyledDashboardMenu>
  );
};

export default DashboardMenu;
