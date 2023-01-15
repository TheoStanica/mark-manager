import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../../core/components/FetchStatus/Loading';
import Success from '../../../core/components/FetchStatus/Success';
import Failure from '../../../core/components/FetchStatus/Failure';
import { twitterApi } from '../../../api/twitter';
import { useConnectTwitterQuery } from '../../../api/auth';

const TwitterConnect = () => {
  const [initConnect, setInitConnect] = useState(true);
  const [status, setStatus] = useState('loading');
  const [initClose, setInitClose] = useState(false);
  const { data } = useConnectTwitterQuery(undefined, { skip: initConnect });
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);
  const dispatch = useDispatch();

  useEffect(() => {
    const success = query.get('success');
    if (success === null) {
      setInitConnect(false);
    } else {
      if (success === 'true') {
        setStatus('success');
        dispatch(twitterApi.util.invalidateTags(['Twitter Accounts']));
      } else {
        setStatus('failure');
      }
      setInitClose(true);
    }
  }, [query, dispatch]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (initClose) {
      timeout = setTimeout(() => {
        window.close();
      }, 3000);
    }
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [initClose]);

  useEffect(() => {
    if (data) {
      const { requestToken } = data;
      if (requestToken) {
        window.location.assign(
          `https://twitter.com/oauth/authorize?oauth_token=${requestToken}`
        );
      }
    }
  }, [data]);

  return (
    <>
      <CssBaseline />
      <Box sx={containerStyle}>
        {status === 'loading' && <Loading noMessage />}
        {status === 'success' && <Success message="Connected" />}
        {status === 'failure' && <Failure message="Failed to connect" />}
      </Box>
    </>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
};

export default TwitterConnect;
