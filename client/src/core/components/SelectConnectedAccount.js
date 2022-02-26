import { Box, MenuItem, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useFetchConnectedAccountsQuery } from '../../api/twitter/api';
import TwitterIcon from '@mui/icons-material/Twitter';

const SelectConnectedAccount = ({ onSelect }) => {
  const { data } = useFetchConnectedAccountsQuery();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [hasAutoselectedAccount, setHasAutoselectedAccount] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAccount(value);
    if (onSelect) onSelect(value);
  };

  const autoSelectFirstAccount = useCallback(() => {
    setHasAutoselectedAccount(true);
    setSelectedAccount(data[0]);
    if (onSelect) onSelect(data[0]);
  }, [data, onSelect]);

  useEffect(() => {
    if (data && data.length > 0 && !hasAutoselectedAccount) {
      autoSelectFirstAccount();
    }
  }, [data, hasAutoselectedAccount, autoSelectFirstAccount]);

  return (
    <TextField
      label="Social Account"
      select
      value={selectedAccount}
      onChange={handleChange}
      fullWidth
    >
      {data.map((account) => (
        <MenuItem key={account.twitterUserId} value={account}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TwitterIcon fontSize="small" />
            <Typography>{account.twitterScreenName}</Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectConnectedAccount;
