import React from 'react';
import AppDrawer from '../../../core/components/AppDrawer';
import AddStream from '../components/AddStream';
import Streams from '../components/Streams';

const Dashboard = () => {
  return (
    <AppDrawer title="Dashboard">
      <Streams />
      <AddStream />
    </AppDrawer>
  );
};

export default Dashboard;
