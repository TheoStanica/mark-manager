import { Typography } from '@mui/material';
import React from 'react';
import { useFetchConnectedAccountsQuery } from '../../../../../../api/social';
import { isTwitterAccount } from '../../../../../../api/social/types';
import {
  IStreamPreference,
  isTwitterStream,
} from '../../../../../../api/user/types';

interface Props {
  stream: IStreamPreference<unknown>;
}

const StreamAccountName = ({ stream }: Props) => {
  const { data: accountsData } = useFetchConnectedAccountsQuery();

  const getTwitterAccountName = () => {
    const account = accountsData?.find((account) => {
      if (isTwitterAccount(account) && isTwitterStream(stream)) {
        return account.data.twitterUserId === stream?.data.twitterUserId;
      }
      return false;
    });
    if (!account) {
      return null;
    }

    if (isTwitterAccount(account)) {
      return account.data.twitterScreenName;
    }
    return null;
  };

  return <Typography sx={overflow}>@{getTwitterAccountName()}</Typography>;
};

const overflow = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export default StreamAccountName;
