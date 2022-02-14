import React from 'react';
import AppDrawer from '../../../core/components/AppDrawer/AppDrawer';
import AddStream from '../components/AddStream/AddStream';
import Streams from '../components/Streams/Streams';

const Dashboard = () => {
  return (
    <AppDrawer title="Dashboard">
      <AddStream />
      <Streams />
    </AppDrawer>
  );
};

export default Dashboard;
