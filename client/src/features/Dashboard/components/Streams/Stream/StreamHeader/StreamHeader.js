import React, { forwardRef } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

import StreamType from './StreamType';
import StreamAccountName from './StreamAccountName';

const StreamHeader = forwardRef(
  ({ stream, dragHandleProps, onReload, onDelete }, ref) => {
    const handleOnReload = (e) => {
      e.stopPropagation();
      if (onReload) onReload();
    };

    const handleOnDelete = (e) => {
      e.stopPropagation();
      if (onDelete) onDelete();
    };

    return (
      <Box ref={ref}>
        <Box {...dragHandleProps} sx={container}>
          <Box sx={info}>
            <TwitterIcon fontSize="small" />
            <StreamType stream={stream} />
            <StreamAccountName stream={stream} />
          </Box>
          <Box sx={control}>
            <IconButton onClick={handleOnReload} aria-label="refresh stream">
              <ReplayIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleOnDelete} aria-label="delete stream">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
      </Box>
    );
  }
);

const container = {
  display: 'flex',
  alignItems: 'center',
  py: 0.25,
  px: 1,
  gap: 1,
};

const info = {
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  gap: 1,
};

const control = {
  display: 'flex',
  marginLeft: 'auto',
};

export default StreamHeader;
