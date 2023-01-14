import React from 'react';
import { Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import SupportedAccounts from './SupportedAccounts';

interface Props {
  open: boolean;
  onClose: () => any;
}

const AddSocialDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-dialog-title"
      aria-describedby="dialog-dialog-platforms"
    >
      <DialogTitle id="dialog-dialog-title" sx={{ textAlign: 'center' }}>
        Add a Social Media account
      </DialogTitle>
      <DialogContent>
        <Box id="dialog-dialog-platforms" sx={platformsStyle}>
          <SupportedAccounts />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const platformsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  minWidth: 250,
  gap: 2,
};

export default AddSocialDialog;
