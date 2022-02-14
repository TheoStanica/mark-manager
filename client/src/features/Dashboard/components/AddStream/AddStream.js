import React, { useState } from 'react';

import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddStreamDialog from './AddStreamDialog';

const AddStream = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Fab
        sx={style}
        color="primary"
        aria-label="add stream"
        onClick={handleOpen}
      >
        <AddIcon fontSize="medium" sx={{ color: 'white' }} />
      </Fab>
      <AddStreamDialog open={open} onClose={handleClose} />
    </>
  );
};

const style = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  m: 4,
  // zIndex: 5001,
};

export default AddStream;
