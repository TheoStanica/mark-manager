import React from 'react';
import AppDrawer from '../../../core/components/AppDrawer';
import Planner from '../components/Planner';

const PlannerPage = () => {
  return (
    <AppDrawer title="Dashboard">
      <Planner />
    </AppDrawer>
  );
};

export default PlannerPage;
