import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import React from 'react';

import GradientButton from '../../../../core/components/GradientButton';
import SelectConnectedAccount from '../../../../core/components/SelectConnectedAccount';

const AddStreamDialog = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Add a new stream</DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <SelectConnectedAccount />
      </DialogContent>
      <DialogActions>
        <Button aria-label="close dialog" onClick={onClose}>
          Cancel
        </Button>
        <GradientButton variant="contained" aria-label="add stream">
          Add stream
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddStreamDialog;
