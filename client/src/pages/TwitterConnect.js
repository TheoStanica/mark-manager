import React, { useEffect } from 'react';
import axiosInstance from '../api/buildClient';

const TwitterConnect = () => {
  useEffect(() => {
    const initiateRequest = async () => {
      const res = await axiosInstance.get('/api/auth/twitter/connect', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (res) {
        window.location.assign(
          `https://twitter.com/oauth/authorize?oauth_token=${res.data.requestToken}`
        );
      }
    };
    initiateRequest();
  });
  // TODO Create a Loading component
  return <div>Loading</div>;
};

export default TwitterConnect;
