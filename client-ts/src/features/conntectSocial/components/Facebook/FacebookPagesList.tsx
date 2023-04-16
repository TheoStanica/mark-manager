import { Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { IAddFacebookAccountPageRequest } from '../../../../api/facebook/types';
import {
  isFacebookAccount,
  IFacebookAccountData,
} from '../../../../api/social/types';
import { IConnectedAccount } from '../../../../core/types/social';
import FacebookAccountPages, { IPageItem } from './FacebookAccountPages';

interface Props {
  connectedAccounts?: Array<IConnectedAccount<unknown>>;
  onSubmit: (pages: Array<IAddFacebookAccountPageRequest>) => any;
}

const FacebookPagesList = ({ connectedAccounts, onSubmit }: Props) => {
  const facebookAccounts = useMemo(() => {
    return connectedAccounts?.filter((account) =>
      isFacebookAccount(account)
    ) as Array<IConnectedAccount<IFacebookAccountData>>;
  }, [connectedAccounts]);

  const [selectedPages, setSelectedPages] = useState<
    Array<IAddFacebookAccountPageRequest>
  >([]);

  const handlePageSelect = (pages: Array<IPageItem>, accountId: string) => {
    const _pages: IAddFacebookAccountPageRequest[] = [];
    pages.forEach((page) => {
      _pages.push({ ...page, facebookUserId: accountId });
    });

    const filteredPages = selectedPages?.filter(
      (p) => p.facebookUserId !== accountId
    );
    const updatedPages = [...filteredPages, ..._pages];
    setSelectedPages(updatedPages);
  };

  const onContinue = () => {
    onSubmit(selectedPages);
  };

  if (!connectedAccounts || connectedAccounts.length === 0) return null;

  return (
    <>
      <div>
        {facebookAccounts.map((account) => (
          <FacebookAccountPages
            key={account.data._id}
            account={account}
            onSelect={(pages) => {
              handlePageSelect(pages, account.data.data.id);
            }}
          />
        ))}
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </>
  );
};

export default FacebookPagesList;
