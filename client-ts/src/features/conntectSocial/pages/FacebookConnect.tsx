import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../../core/components/FetchStatus/Loading';
import Success from '../../../core/components/FetchStatus/Success';
import Failure from '../../../core/components/FetchStatus/Failure';
import { socialApi, useFetchConnectedAccountsQuery } from '../../../api/social';
import { useConnectFacebookQuery } from '../../../api/auth';
import { useFetchAccountPagesQuery } from '../../../api/facebook';
import { isFacebookAccount } from '../../../api/social/types';

const FacebookConnect = () => {
  const [initConnect, setInitConnect] = useState(true);
  const [status, setStatus] = useState('loading');
  const [connected, setConnected] = useState(false);
  const { data } = useConnectFacebookQuery(undefined, { skip: initConnect });
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);
  const dispatch = useDispatch();
  const { data: facebookPages } = useFetchAccountPagesQuery(undefined, {
    skip: !connected,
  });
  const { data: connectedAccounts } = useFetchConnectedAccountsQuery();

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
      setConnected(true);
    }
  }, [query, dispatch]);

  const connectedFacebookAccounts = useMemo(() => {
    return connectedAccounts?.filter((account) => isFacebookAccount(account));
  }, [connectedAccounts]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    // if (connected) {
    //   timeout = setTimeout(() => {
    //     window.close();
    //   }, 3000);
    // }
    // return () => {
    //   if (timeout !== null) {
    //     clearTimeout(timeout);
    //   }
    // };
  }, [connected]);

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
      {/* {JSON.stringify(facebookPages)} */}
      {JSON.stringify(connectedFacebookAccounts)}
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
