import React, { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IConnectedAccount } from '../../../../core/types/social';
import { isTwitterAccount } from '../../../../api/social/types';

interface Props {
  account: IConnectedAccount<unknown>;
}

const ConnectedAccount = ({ account }: Props) => {
  const name = useMemo(() => {
    if (isTwitterAccount(account)) {
      return account.data.twitterScreenName;
    }
    return null;
  }, [account]);

  return (
    <Box sx={style}>
      <Box sx={container}>
        <TwitterIcon htmlColor="#1DA1F2" />
        <Typography>{name}</Typography>
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
