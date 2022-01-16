import React from 'react';
import { useLogoutMutation } from '../../../api/auth/api';
import AppDrawer from '../../../core/components/AppDrawer';
import useApplicationTheme from '../../../core/hooks/useApplicationTheme';

const Dashboard = () => {
  const [logout] = useLogoutMutation();
  const { toggleTheme } = useApplicationTheme();

  return (
    <AppDrawer title="Dashboard">
      <button onClick={logout}>logout</button>

      <button onClick={toggleTheme}>toggle theme</button>
    </AppDrawer>
  );
};

export default Dashboard;
