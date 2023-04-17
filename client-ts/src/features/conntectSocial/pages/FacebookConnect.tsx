import { Box, CssBaseline } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../../core/components/FetchStatus/Loading';
import { socialApi, useFetchConnectedAccountsQuery } from '../../../api/social';
import { useConnectFacebookQuery } from '../../../api/auth';
import FacebookPagesList from '../components/Facebook/FacebookPagesList';
import { useAddFacebookAccountPageMutation } from '../../../api/facebook';
import { IAddFacebookAccountPageRequest } from '../../../api/facebook/types';

const FacebookConnect = () => {
  const [initConnect, setInitConnect] = useState(true);
  const [status, setStatus] = useState('loading');
  const [connected, setConnected] = useState(false);
  const { data } = useConnectFacebookQuery(undefined, { skip: initConnect });
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);
  const dispatch = useDispatch();
  const { data: connectedAccounts } = useFetchConnectedAccountsQuery(
    undefined,
    { skip: !connected }
  );

  const [addPage] = useAddFacebookAccountPageMutation();

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

  const onSubmit = async (pages: IAddFacebookAccountPageRequest[]) => {
    setStatus('loading');
    for (const page of pages) {
      await addPage(page);
    }

    window.close();
  };

  useEffect(() => {
    if (data) {
      const { appId, redirect } = data;
      if (appId && redirect) {
        window.location.assign(
          ` https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=${encodeURIComponent(
            redirect
          )}&client_id=${appId}&scope=pages_read_engagement,publish_to_groups,pages_manage_posts`
        );
      }
    }
  }, [data]);

  return (
    <>
      <CssBaseline />
      <Box sx={containerStyle}>
        <FacebookPagesList
          connectedAccounts={connectedAccounts}
          onSubmit={onSubmit}
        />
        {status === 'loading' && <Loading noMessage />}
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
