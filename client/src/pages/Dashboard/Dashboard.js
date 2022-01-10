import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/actions/userActions';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import DashboardStreams from '../../components/DashboardStreams/DashboardStreams';
import { fetchTwitterAccounts } from '../../redux/actions/twitterActions';
import { StyledDashboard } from './styles';
import { useLogoutMutation } from '../../api/auth/api';
import { useCurrentUserQuery } from '../../api/user/api';

const Dashboard = ({}) => {
  // useSelector((state) => state.userReducer.present);
  const [fetchData, setFetchData] = useState(false);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { isLoading, data } = useCurrentUserQuery();
  // const [qdata, setQdata] = useState(data);

  // useEffect(() => {
  //   // dispatch(getUserInfo());
  //   // dispatch(fetchTwitterAccounts());
  //   // const a = async () => {
  //   //   await currentUser();
  //   // };
  //   // a();
  //   // setFetchData(true);
  //   setQdata(data);
  // }, [data]);

  console.log(data);

  return (
    <>
      {/* <VerticalMenu /> */}
      {isLoading && <p>LOADING DATA GOD DAMNIT</p>}
      {JSON.stringify(data)}
      <StyledDashboard>
        <p>Dashboard page</p>
        <p> shit</p>
        <button onClick={async () => await logout()}>Log out</button>
        <button onClick={() => setFetchData(!fetchData)}>Fetch new data</button>
        {/* <DashboardMenu /> */}
        {/* <DashboardStreams /> */}
      </StyledDashboard>
    </>
  );
};

export default Dashboard;
