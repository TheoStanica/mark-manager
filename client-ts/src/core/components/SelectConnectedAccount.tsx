import {
  Autocomplete,
  Box,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useFetchConnectedAccountsQuery } from '../../api/social';
import { IConnectedAccount } from '../types/social';
import { isFacebookAccount, isTwitterAccount } from '../../api/social/types';

interface Props {
  onSelect: (accounts: Array<Option>) => any;
  multiple?: boolean;
  defaultValue?: DefaultOption;
  readOnly?: boolean;
}

export interface Option {
  label: string;
  account: IConnectedAccount<unknown>;
  pageId?: string;
}

export interface IDefaultOption<T> {
  data: T;
}

export interface IDefaultOptionTwitter {
  twitterUserId: string;
}

export interface IDefaultOptionFacbook {
  facebookUserId: string;
  pageId: string;
}

export interface DefaultOption
  extends IDefaultOption<IDefaultOptionTwitter | IDefaultOptionFacbook> {}

export function isDefaultOptionFacebook(
  option: DefaultOption
): option is IDefaultOption<IDefaultOptionFacbook> {
  return 'facebookUserId' in option.data;
}

export function isDefaultOptionTwitter(
  option: DefaultOption
): option is IDefaultOption<IDefaultOptionTwitter> {
  return 'twitterUserId' in option.data;
}

const SelectConnectedAccount = ({
  multiple,
  defaultValue,
  // initialUsers,
  readOnly,
  onSelect,
}: Props) => {
  const { data } = useFetchConnectedAccountsQuery();

  const options: Array<Option> = useMemo(() => {
    if (!data || data.length <= 0) {
      return [];
    }
    const pages = data.flatMap((acc) => {
      if (isFacebookAccount(acc)) {
        return acc.data.pages.map((page) => ({
          label: acc.data.data.displayName + ` - ${page.name} (page)`,
          account: acc,
          pageId: page.id,
        }));
      } else {
        return [];
      }
    });
    const accounts = data.flatMap((acc) => {
      let label = 'unknown';
      if (isTwitterAccount(acc)) {
        label = acc.data.twitterScreenName;
      }
      if (isFacebookAccount(acc)) {
        return [];
      }
      return { label, account: acc };
    });
    return [...accounts, ...pages];
  }, [data]);

  const _defaultValue: Option | undefined = useMemo(() => {
    if (!defaultValue) {
      return undefined;
    }

    if (isDefaultOptionFacebook(defaultValue)) {
      const option = options.find((option) => {
        if (isFacebookAccount(option.account)) {
          return (
            option.account.data.data.id === defaultValue.data.facebookUserId &&
            option.pageId === defaultValue.data.pageId
          );
        }
        return undefined;
      });
      return option;
    } else if (isDefaultOptionTwitter(defaultValue)) {
      const option = options.find((option) => {
        if (isTwitterAccount(option.account)) {
          return (
            option.account.data.twitterUserId ===
            defaultValue.data.twitterUserId
          );
        }
        return undefined;
      });
      return option;
    }
  }, [defaultValue, options]);

  const onSelected = (option: Option | Array<Option> | null) => {
    if (!option) {
      return onSelect([]);
    }
    if (Array.isArray(option)) {
      return onSelect(option);
    }
    return onSelect([option]);
  };

  if (!data || data.length <= 0) {
    return null;
  }

  return (
    <Autocomplete
      id="select-account"
      fullWidth
      readOnly={readOnly}
      disabled={readOnly}
      multiple={multiple}
      options={options}
      defaultValue={_defaultValue}
      renderInput={(params) => <TextField {...params} label="Social Account" />}
      renderOption={(props, option) => (
        <MenuItem {...props}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {option.account.type === 'twitter' && (
              <TwitterIcon fontSize="small" htmlColor="#1DA1F2" />
            )}
            {option.account.type === 'facebook' && (
              <FacebookIcon fontSize="small" htmlColor="#4267B2" />
            )}
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
