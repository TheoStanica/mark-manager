import { Typography } from '@mui/material';
import React from 'react';
import { useFetchConnectedAccountsQuery } from '../../../../../../api/twitter';
import { IStreamPreference } from '../../../../../../api/user/types';

interface Props {
  stream: IStreamPreference;
}

const StreamAccountName = ({ stream }: Props) => {
  const { data: accountsData } = useFetchConnectedAccountsQuery();

  const getTwitterAccountName = () => {
    const account = accountsData?.find(
      (account) => account.twitterUserId === stream?.twitterUserId
    );
    return account?.twitterScreenName;
  };

  return <Typography sx={overflow}>@{getTwitterAccountName()}</Typography>;
};

const overflow = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export default StreamAccountName;
