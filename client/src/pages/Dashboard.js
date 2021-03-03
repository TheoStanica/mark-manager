import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/userActions';
import DisplayUserMessages from '../components/DisplayUserMessages';
import ConnectTwitterButton from '../components/ConnectTwitterButton';
import TwitterTimeline from '../components/TwitterTimeline';
import CreateTweet from '../components/CreateTweet';
import DisplayErrors from '../components/DisplayErrors';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const { isConnected } = useSelector((state) => state.twitterReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <React.Fragment>
      <DisplayErrors />
      {!isConnected && <ConnectTwitterButton />}
      {isConnected && <CreateTweet />}
      {isConnected && <TwitterTimeline />}
      <DisplayUserMessages />
    </React.Fragment>
  );
};

export default Dashboard;
