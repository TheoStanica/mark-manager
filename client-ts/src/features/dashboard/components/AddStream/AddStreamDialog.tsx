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
import { isTwitterAccount } from '../../../../api/social/types';
import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../api/user';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../api/user/types';
import SelectConnectedAccount from '../../../../core/components/SelectConnectedAccount';
import { IConnectedAccount } from '../../../../core/types/social';
import useAddStreamDisabled from '../../hooks/useAddStreamDisabled';
import SelectStreamType, { StreamType } from './SelectStreamType';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  open: boolean;
  onClose: () => any;
}

const AddStreamDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const [selectedAccount, setSelectedAccount] = useState<
    IConnectedAccount<unknown> | undefined
  >(undefined);
  const [selectedStreamType, setSelectedStreamType] = useState<
    StreamType | undefined
  >(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const isSubmitDisabled = useAddStreamDisabled({
    selectedAccount,
    selectedStreamType,
    search,
  });
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();

  const onSelectAccount = useCallback(
    (accounts: Array<IConnectedAccount<unknown>>) => {
      setSelectedAccount(accounts[0] || undefined);
    },
    []
  );

  const onSelectStreamType = useCallback((stream?: StreamType) => {
    setSelectedStreamType(stream);
  }, []);

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const onSubmit = useCallback(() => {
    const streams = data?.user.stream_preferences;
    if (!selectedAccount?.type) {
      return;
    }
    if (!selectedStreamType) {
      return;
    }

    if (!streams) {
      return;
    }
    if (isTwitterAccount(selectedAccount)) {
      const newStream: IStreamPreference<ITwitterStreamData> = {
        id: uuidv4(),
        platform: selectedAccount?.type,
        data: {
          twitterUserId: selectedAccount.data.twitterUserId,
          type: selectedStreamType,
          search: search,
        },
      };
      const updateData = [...streams, newStream];
      update({ stream_preferences: updateData });
    }
    onClose();
  }, [
    data?.user.stream_preferences,
    search,
    selectedAccount,
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
          platform={selectedAccount?.type}
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
