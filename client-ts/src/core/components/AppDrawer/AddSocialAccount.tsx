import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddSocialDialog from '../../../features/conntectSocial/components/AddSocialDialog';

const AddSocialAccount = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Account" />
      </ListItem>
      <AddSocialDialog open={open} onClose={handleClose} />
    </>
  );
};

export default AddSocialAccount;
