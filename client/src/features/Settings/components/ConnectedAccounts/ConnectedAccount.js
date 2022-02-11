import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';

const ConnectedAccount = ({ account }) => {
  return (
    <Box sx={style}>
      <Box sx={container}>
        <TwitterIcon />
        <Typography>{account.twitterScreenName}</Typography>
      </Box>
      <Button disabled>Disconnect</Button>
    </Box>
  );
};

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const container = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};

export default ConnectedAccount;
