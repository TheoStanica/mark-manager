import React, { useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import useCustomScrollTrigger from '../../../../../../core/hooks/useCustomScrollTrigger';
import {
  IStreamPreference,
  isTwitterStream,
} from '../../../../../../api/user/types';
import TwitterSearchStream from './TwitterSearchStream';

interface Props {
  stream: IStreamPreference<unknown>;
}

const StreamBody = ({ stream }: Props) => {
  const scrollTriggerTargetRef = useRef(null);
  useCustomScrollTrigger({
    target: scrollTriggerTargetRef?.current || window,
    threshold: 100,
  });

  const renderStream = useCallback(() => {
    if (isTwitterStream(stream)) {
      return <TwitterSearchStream stream={stream} />;
    }
  }, [stream]);

  return (
    <Box ref={scrollTriggerTargetRef} sx={style}>
      {renderStream()}
    </Box>
  );
};

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  overflowY: 'overlay',
  '&::-webkit-scrollbar': {
    width: '0.5rem',
    height: '0.5rem',
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default StreamBody;
