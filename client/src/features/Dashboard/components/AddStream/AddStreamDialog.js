import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

import GradientButton from '../../../../core/components/GradientButton';
import SelectConnectedAccount from '../../../../core/components/SelectConnectedAccount';

const AddStreamDialog = ({ open, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add a new stream</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Test. Let Google help apps determine location. This means sending
          anonymous location data to Google, even when no apps are running.
        </DialogContentText>
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
