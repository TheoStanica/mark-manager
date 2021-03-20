import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/actions/userActions';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import './Dashboard.css';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import DashboardStreams from '../../components/DashboardStreams/DashboardStreams';
import { getTwitterProfileInfoData } from '../../redux/actions/twitterActions';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTwitterProfileInfoData());
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <>
      <VerticalMenu />
      <div className="dashboard">
        <DashboardStreams />
        <DashboardMenu />
      </div>
    </>
  );
};

export default Dashboard;
