import { Typography } from '@mui/material';
import React from 'react';
import { useFetchConnectedAccountsQuery } from '../../../../../../api/social';
import {
  isFacebookAccount,
  isTwitterAccount,
} from '../../../../../../api/social/types';
import {
  isFacebookStream,
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
      if (isFacebookAccount(account) && isFacebookStream(stream)) {
        return account.data.data.id === stream?.data.facebookUserId;
      }
      return false;
    });
    if (!account) {
      return null;
    }

    if (isTwitterAccount(account)) {
      return account.data.twitterScreenName;
    }
    if (isFacebookAccount(account) && isFacebookStream(stream)) {
      const pageId = stream.data.pageId;
      const page = account.data.pages.find((page) => page.id === pageId);
      if (!page) return '';
      return page?.name + '(' + account.data.data.displayName + ')';
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
