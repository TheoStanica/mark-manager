import {
  Autocomplete,
  Box,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useFetchConnectedAccountsQuery } from '../../api/social';
import { IConnectedAccount } from '../types/social';
import { isTwitterAccount } from '../../api/social/types';

interface Props {
  onSelect: (accounts: Array<IConnectedAccount<unknown>>) => any;
  multiple?: boolean;
}

interface Option {
  label: string;
  account: IConnectedAccount<unknown>;
}

const SelectConnectedAccount = ({ multiple, onSelect }: Props) => {
  const { data } = useFetchConnectedAccountsQuery();

  const options: Array<Option> = useMemo(() => {
    if (!data || data.length <= 0) {
      return [];
    }
    return data.map((acc) => {
      let label = 'unknown';
      if (isTwitterAccount(acc)) {
        label = acc.data.twitterScreenName;
      }
      return { label, account: acc };
    });
  }, [data]);

  const onSelected = (option: Option | Array<Option> | null) => {
    if (!option) {
      return onSelect([]);
    }
    if (Array.isArray(option)) {
      return onSelect(option.map((opt) => opt.account));
    }
    return onSelect([option.account]);
  };

  if (!data || data.length <= 0) {
    return null;
  }

  return (
    <Autocomplete
      id="select-account"
      fullWidth
      multiple={multiple}
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
      onChange={(_, value) => {
        onSelected(value);
      }}
    />
  );
};

export default SelectConnectedAccount;
