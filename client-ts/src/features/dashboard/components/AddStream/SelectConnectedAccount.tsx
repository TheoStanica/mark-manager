import {
  Autocomplete,
  Box,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useFetchConnectedAccountsQuery } from '../../../../api/twitter';
import { IConnectedAccount } from '../../../../api/twitter/types';

interface Props {
  onSelect: (account: IConnectedAccount) => any;
}

interface Option {
  label: string;
  account: IConnectedAccount;
}

const SelectConnectedAccount = ({ onSelect }: Props) => {
  const { data } = useFetchConnectedAccountsQuery();
  const [selectedAccount, setSelectedAccount] =
    useState<IConnectedAccount | null>(null);
  const [hasAutoselectedAccount, setHasAutoselectedAccount] = useState(false);

  const options: Array<Option> = useMemo(() => {
    if (!data || data.length <= 0) {
      return [];
    }
    return data.map((acc) => ({ label: acc.twitterScreenName, account: acc }));
  }, [data]);

  const findAccount = useCallback(
    (id: string) => {
      if (!data || data?.length <= 0) {
        return;
      }
      const index = data?.findIndex((acc) => acc.twitterUserId === id);
      if (!index) {
        return;
      }
      console.log('send data of index');
      return data[index];
    },
    [data]
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    console.log('selected', value);
    const account = findAccount(value);
    if (!account) {
      return;
    }
    setSelectedAccount(account);
    if (onSelect) onSelect(account);
  };

  const autoSelectFirstAccount = useCallback(() => {
    if (!data || !data[0]) {
      return;
    }
    setHasAutoselectedAccount(true);
    setSelectedAccount(data[0]);
    if (onSelect) onSelect(data[0]);
  }, [data, onSelect]);

  useEffect(() => {
    if (data && data.length > 0 && !hasAutoselectedAccount) {
      autoSelectFirstAccount();
    }
  }, [data, hasAutoselectedAccount, autoSelectFirstAccount]);

  if (!data || data.length <= 0 || !selectedAccount) {
    return null;
  }

  return (
    <Autocomplete
      id="select-account"
      fullWidth
      options={options}
      renderInput={(params) => <TextField {...params} label="Social Account" />}
      renderOption={(props, option) => (
        <MenuItem {...props}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TwitterIcon fontSize="small" htmlColor="#1DA1F2" />
            <Typography>{option.label}</Typography>
          </Box>
        </MenuItem>
      )}
    />
    // <TextField
    //   aria-label="Select connected social media account"
    //   label="Social Account"
    //   select
    //   value={'you piece of shit'}
    //   onChange={handleChange}
    //   fullWidth
    // >
    //   {data?.map((account) => (
    //     <MenuItem key={account.twitterUserId} value={account.twitterUserId}>
    //       <Box sx={{ display: 'flex', gap: 1 }}>
    //         <TwitterIcon fontSize="small" htmlColor="#1DA1F2" />
    //         <Typography>{account.twitterScreenName}</Typography>
    //       </Box>
    //     </MenuItem>
    //   ))}
    // </TextField>
  );
};

export default SelectConnectedAccount;
