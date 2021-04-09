import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/actions/userActions';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import DashboardStreams from '../../components/DashboardStreams/DashboardStreams';
import { fetchTwitterAccounts } from '../../redux/actions/twitterActions';
import { StyledDashboard } from './styles';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(fetchTwitterAccounts());
  }, [dispatch]);

  return (
    <>
      <VerticalMenu />
      <StyledDashboard>
        <DashboardStreams />
        <DashboardMenu />
      </StyledDashboard>
    </>
  );
};

export default Dashboard;
