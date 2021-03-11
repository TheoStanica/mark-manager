import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading/Loading';
import { useQuery } from '../hooks/useQuery';
import {
  connectToTwitter,
  getTwitterDefaultData,
} from '../redux/actions/twitterActions';
import { setUserMessages } from '../redux/actions/userActions';

const TwitterConnect = () => {
  const isConnected = useSelector((state) => state.twitterReducer.isConnected);
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    // if user already connected his twitter account, close tab
    if (isConnected) {
      window.close();
    } else if (query.get('success') === 'true') {
      // if user tokens were successfully saved, get data about user too
      dispatch(getTwitterDefaultData());
    } else if (query.get('success') === 'false') {
      // user did not authorize the app
      // Alert message - will do user message for now.
      // need to create an Alerts component
      dispatch(
        setUserMessages({
          message: 'Could not connect your account with Twitter',
        })
      );
      window.close();
    } else {
      dispatch(connectToTwitter());
    }
  }, [isConnected, query, dispatch]);

  return <Loading />;
};

export default TwitterConnect;
