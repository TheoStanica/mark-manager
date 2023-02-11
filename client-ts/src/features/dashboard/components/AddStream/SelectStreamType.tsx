import { Autocomplete, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import {
  StreamPlatformType,
  TwitterStreamTypes,
} from '../../../../api/user/types';

export type StreamType = TwitterStreamTypes;

interface Option {
  label: string;
  value: StreamType;
}

interface Props {
  platform?: StreamPlatformType;
  onSelect: (streamType?: StreamType) => any;
}

const SelectStreamType = ({ platform, onSelect }: Props) => {
  const options: Array<Option> = useMemo(() => {
    if (platform === 'twitter') {
      return [
        {
          label: 'Home Timeline',
          value: 'home_timeline',
        },
        {
          label: 'Search',
          value: 'search',
        },
      ];
    }
    return [];
  }, [platform]);

  return (
    <Autocomplete
      id="select-stream-type"
      fullWidth
      options={options}
      sx={{ mt: 3 }}
      renderInput={(params) => <TextField {...params} label="Stream Type" />}
      onChange={(_, item) => {
        onSelect(item?.value);
      }}
    />
  );
};

export default SelectStreamType;
