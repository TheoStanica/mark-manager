import React from 'react';
import AppDrawer from '../../../core/components/AppDrawer/AppDrawer';
import Streams from '../components/Streams/Streams';

const Dashboard = () => {
  return (
    <AppDrawer title="Dashboard">
      <Streams />
    </AppDrawer>
  );
};

export default Dashboard;
