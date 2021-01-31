import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/userActions';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Dashboard;
