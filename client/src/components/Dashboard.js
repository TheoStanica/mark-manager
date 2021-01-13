import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ user }) => {
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>Tier: {user.userTier}</p>
    </div>
  );
};

export default Dashboard;
