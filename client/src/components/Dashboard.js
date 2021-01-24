import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getUserInfo } from '../redux/actions/userActions';

const Dashboard = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (!user.accessToken && !user.refreshToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Dashboard;
