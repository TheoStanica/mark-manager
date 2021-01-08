import React, { useState } from 'react';

const Dashboard = ({ user }) => {
  if (!user) {
    return (
      <div>You are not logged in... please log in to access this page</div>
    );
  }

  // return <div>{JSON.stringify(userData)}</div>;
  return (
    <div>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>Tier: {user.userTier}</p>
    </div>
  );
};

export default Dashboard;
