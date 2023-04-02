import React, { useCallback, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IConnectedAccount } from '../../../../core/types/social';
import {
  isFacebookAccount,
  isTwitterAccount,
} from '../../../../api/social/types';

interface Props {
  account: IConnectedAccount<unknown>;
}

const ConnectedAccount = ({ account }: Props) => {
  const name = useMemo(() => {
    if (isTwitterAccount(account)) {
      return account.data.twitterScreenName;
    }
    if (isFacebookAccount(account)) {
      return account.data.data.displayName;
    }
    return null;
  }, [account]);

  const renderIcon = useCallback(() => {
    if (isTwitterAccount(account)) {
      return <TwitterIcon htmlColor="#1DA1F2" />;
    }
    if (isFacebookAccount(account)) {
      return <FacebookIcon htmlColor="#4267B2" />;
    }
    return null;
  }, [account]);

  return (
    <Box sx={style}>
      <Box sx={container}>
        {renderIcon()}
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
