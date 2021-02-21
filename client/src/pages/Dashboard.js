import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/userActions';
import { getTwitterProfileInfoData } from '../redux/actions/twitterActions';
import DisplayUserMessages from '../components/DisplayUserMessages';
import ConnectTwitterButton from '../components/ConnectTwitterButton';
import TwitterTimeline from '../components/TwitterTimeline';
import CreateTweet from '../components/CreateTweet';

const Dashboard = () => {
  useSelector((state) => state.userReducer.present);
  const { isConnected } = useSelector((state) => state.twitterReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Link to="/settings" className="me-3">
        Settings
      </Link>
      <div
        className="btn btn-primary"
        onClick={() => dispatch(getTwitterProfileInfoData())}
      >
        GET USER TWITTER DETAILS
      </div>
      {!isConnected && <ConnectTwitterButton />}
      {isConnected && <CreateTweet />}
      {isConnected && <TwitterTimeline />}
      <DisplayUserMessages />
    </React.Fragment>
  );
};

export default Dashboard;
