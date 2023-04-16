import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useFetchAccountPagesQuery } from '../../../../api/facebook';
import { IFacebookAccountPageData } from '../../../../api/facebook/types';
import { useFetchConnectedAccountsQuery } from '../../../../api/social';
import {
  IFacebookAccountData,
  isFacebookAccount,
} from '../../../../api/social/types';
import { IConnectedAccount } from '../../../../core/types/social';

interface Props {
  account: IConnectedAccount<IFacebookAccountData>;
  onSelect: (page: Array<IPageItem>) => any;
}

export interface IPageItem extends IFacebookAccountPageData {
  selected: boolean;
  disabled: boolean;
}

const FacebookAccountPages = ({ account, onSelect }: Props) => {
  const [items, setItems] = useState<Array<IPageItem>>([]);
  const { data: connectedAccounts } = useFetchConnectedAccountsQuery();

  const { data } = useFetchAccountPagesQuery(
    { facebookUserId: account.data.data.id },
    {}
  );

  const facebookAccounts = useMemo(() => {
    return connectedAccounts?.filter((account) =>
      isFacebookAccount(account)
    ) as Array<IConnectedAccount<IFacebookAccountData>>;
  }, [connectedAccounts]);

  useEffect(() => {
    if (data) {
      setItems(
        data.data.map((page) => {
          const pageId = page.id;
          const isConnected = facebookAccounts.some((account) => {
            const pages = account.data.pages;
            return pages.some((p) => p.id === pageId);
          });
          const selected = isConnected;
          const disabled = isConnected;

          return {
            ...page,
            selected,
            disabled,
          };
        })
      );
    }
  }, [data, data?.data, facebookAccounts]);

  const handleChange = (item: IPageItem) => {
    const updatedItems = items.map((page) =>
      page.id === item.id ? { ...page, selected: !page.selected } : page
    );
    onSelect(updatedItems.filter((page) => page.selected));
    setItems(updatedItems);
  };

  if (!data) return <div>Loading data for {account.data.data.displayName}</div>;

  return (
    <div>
      <Typography>{account.data.data.displayName + "'s pages:"}</Typography>

      {items?.map((page) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <FormControlLabel
            label={page.name}
            control={
              <Checkbox
                checked={page.selected}
                disabled={page.disabled}
                onChange={() => handleChange(page)}
              />
            }
          />
        </Box>
      ))}
    </div>
  );
};

export default FacebookAccountPages;
