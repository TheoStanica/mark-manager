import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/userActions';
import { getTwitterProfileInfoData } from '../redux/actions/twitterActions';
import DisplayUserMessages from '../components/DisplayUserMessages';
import ConnectTwitterButton from '../components/ConnectTwitterButton';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const isConnected = useSelector((state) => state.twitterReducer.isConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div>
      <Link to="/settings" className="me-3">
        Settings
      </Link>
      <Link to="/twitter/connect">Connect To Twitter</Link>
      <div
        className="btn btn-primary"
        onClick={() => dispatch(getTwitterProfileInfoData())}
      >
        GET USER TWITTER DETAILS
      </div>
      {!isConnected && <ConnectTwitterButton />}
      <DisplayUserMessages />
    </div>
  );
};

export default Dashboard;
