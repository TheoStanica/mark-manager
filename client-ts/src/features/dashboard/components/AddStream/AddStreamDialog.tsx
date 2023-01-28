import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import SelectConnectedAccount from '../../../../core/components/SelectConnectedAccount';
import { IConnectedAccount } from '../../../../core/types/social';

interface Props {
  open: boolean;
  onClose: () => any;
}

const AddStreamDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const [selectedAccount, setSelectedAccount] = useState<
    IConnectedAccount<unknown> | undefined
  >(undefined);

  const isSubmitDisabled = useMemo(() => {
    if (!selectedAccount) {
      return true;
    }
  }, [selectedAccount]);

  const onSelect = useCallback(
    (accounts: Array<IConnectedAccount<unknown>>) => {
      if (!accounts[0]) {
        return;
      }
      setSelectedAccount(accounts[0]);
    },
    []
  );

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new stream</DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <SelectConnectedAccount onSelect={onSelect} />
      </DialogContent>
      <DialogActions>
        <Button aria-label="close dialog" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          aria-label="add stream"
          disabled={isSubmitDisabled}
        >
          Add stream
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStreamDialog;
