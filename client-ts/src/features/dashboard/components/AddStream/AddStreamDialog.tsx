import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import React from 'react';
import SelectConnectedAccount from './SelectConnectedAccount';

interface Props {
  open: boolean;
  onClose: () => any;
}

const AddStreamDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new stream</DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <SelectConnectedAccount onSelect={(a) => console.log('selected', a)} />
      </DialogContent>
      <DialogActions>
        <Button aria-label="close dialog" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" aria-label="add stream">
          Add stream
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStreamDialog;
