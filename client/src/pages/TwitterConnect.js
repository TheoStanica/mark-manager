import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading/Loading';
import {
  connectToTwitter,
  fetchTwitterAccounts,
} from '../redux/actions/twitterActions';
import { setUserMessages } from '../redux/actions/userActions';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TwitterConnect = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('Connected');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  const renderMessage = () => {
    return <StyledCenteredDiv>{message}</StyledCenteredDiv>;
  };

  useEffect(() => {
    const handleConnect = async () => {
      if (query.get('success') === 'true') {
        await dispatch(fetchTwitterAccounts());
        setIsLoading(false);
        setMessage('Connected! Closing page...');
        setTimeout(() => {
          window.close();
        }, 2000);
      } else if (query.get('success') === 'false') {
        dispatch(
          setUserMessages({
            message: 'Could not connect your account with Twitter',
          })
        );
        window.close();
      } else {
        dispatch(connectToTwitter());
      }
    };
    handleConnect();
  }, [query, dispatch]);

  return isLoading ? <Loading /> : renderMessage();
};

const StyledCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default TwitterConnect;
