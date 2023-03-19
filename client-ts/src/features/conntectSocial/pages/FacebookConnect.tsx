import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../../core/components/FetchStatus/Loading';
import Success from '../../../core/components/FetchStatus/Success';
import Failure from '../../../core/components/FetchStatus/Failure';
import { socialApi } from '../../../api/social';
import { useConnectFacebookQuery } from '../../../api/auth';

const FacebookConnect = () => {
  const [initConnect, setInitConnect] = useState(true);
  const [status, setStatus] = useState('loading');
  const [initClose, setInitClose] = useState(false);
  const { data } = useConnectFacebookQuery(undefined, { skip: initConnect });
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
        dispatch(socialApi.util.invalidateTags(['Connected Accounts']));
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
      const { appId, redirect } = data;
      if (appId && redirect) {
        window.location.assign(
          ` https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=${encodeURIComponent(
            redirect
          )}&client_id=${appId}`
        );
      }

      // https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Fmark.dev%2Fapi%2Fauth%2Ffacebook%2Fcallback&client_id=602020558451811
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

export default FacebookConnect;
