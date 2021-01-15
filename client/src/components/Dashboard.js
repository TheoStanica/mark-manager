import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>Tier: {user.userTier}</p>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Dashboard;
