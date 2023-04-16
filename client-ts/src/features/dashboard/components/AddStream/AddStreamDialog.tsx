import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  isFacebookAccount,
  isTwitterAccount,
} from '../../../../api/social/types';
import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../api/user';
import {
  FacebookStreamTypes,
  IFacebookStreamData,
  IStreamPreference,
  ITwitterStreamData,
  TwitterStreamTypes,
} from '../../../../api/user/types';
import SelectConnectedAccount, {
  Option,
} from '../../../../core/components/SelectConnectedAccount';
import useAddStreamDisabled from '../../hooks/useAddStreamDisabled';
import SelectStreamType, { StreamType } from './SelectStreamType';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  open: boolean;
  onClose: () => any;
}

const AddStreamDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const [selectedStreamType, setSelectedStreamType] = useState<
    StreamType | FacebookStreamTypes | undefined
  >(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const isSubmitDisabled = useAddStreamDisabled({
    selectedOption,
    selectedStreamType,
    search,
  });
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();

  const onSelectAccount = useCallback((accounts: Array<Option>) => {
    setSelectedOption(accounts[0] || undefined);
  }, []);

  const onSelectStreamType = useCallback(
    (stream?: StreamType | FacebookStreamTypes) => {
      setSelectedStreamType(stream);
    },
    []
  );

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    const streams = data?.user.stream_preferences;
    if (!selectedOption?.account?.type) {
      return;
    }
    if (!selectedStreamType) {
      return;
    }

    if (!streams) {
      return;
    }
    if (isTwitterAccount(selectedOption.account)) {
      const newStream: IStreamPreference<ITwitterStreamData> = {
        id: uuidv4(),
        platform: selectedOption.account?.type,
        data: {
          twitterUserId: selectedOption.account.data.twitterUserId,
          type: selectedStreamType as TwitterStreamTypes,
          search: search,
        },
      };
      const updateData = [...streams, newStream];
      update({ stream_preferences: updateData });
    }
    if (isFacebookAccount(selectedOption.account)) {
      const newStream: IStreamPreference<IFacebookStreamData> = {
        id: uuidv4(),
        platform: selectedOption.account?.type,
        data: {
          facebookUserId: selectedOption.account.data.data.id,
          type: selectedStreamType as FacebookStreamTypes,
          pageId: selectedOption.pageId as string,
        },
      };
      const updateData = [...streams, newStream];

      update({ stream_preferences: updateData });
    }
    onClose();
  }, [
    data?.user.stream_preferences,
    search,
    selectedOption,
    selectedStreamType,
    update,
    onClose,
  ]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new stream</DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <SelectConnectedAccount onSelect={onSelectAccount} />
        <SelectStreamType
          platform={selectedOption?.account?.type}
          onSelect={onSelectStreamType}
        />
        {selectedStreamType === 'search' && (
          <TextField
            sx={{ mt: theme.spacing(3) }}
            fullWidth
            onChange={onSearch}
            placeholder="Search..."
            label="Search"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button aria-label="close dialog" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          aria-label="add stream"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          Add stream
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStreamDialog;
