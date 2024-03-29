import React, { forwardRef } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

import StreamType from './StreamType';
import StreamAccountName from './StreamAccountName';
import {
  isFacebookStream,
  IStreamPreference,
  isTwitterStream,
} from '../../../../../../api/user/types';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface Props {
  stream: IStreamPreference<unknown>;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  onReload: () => any;
  onDelete: (streamId: string) => any;
}

const StreamHeader = forwardRef(
  ({ stream, dragHandleProps, onReload, onDelete }: Props, ref) => {
    const handleOnReload = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();
      if (onReload) onReload();
    };

    const handleOnDelete = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();
      if (onDelete) onDelete(stream.id);
    };

    return (
      <Box ref={ref}>
        <Box {...dragHandleProps} sx={container}>
          <Box sx={info}>
            {isTwitterStream(stream) && (
              <TwitterIcon fontSize="small" htmlColor="#1DA1F2" />
            )}
            {isFacebookStream(stream) && (
              <FacebookIcon fontSize="small" htmlColor="#4267B2" />
            )}
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
