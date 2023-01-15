import React, { useRef } from 'react';
import { Box } from '@mui/material';
import useCustomScrollTrigger from '../../../../../core/hooks/useCustomScrollTrigger';

const StreamBody = () => {
  const scrollTriggerTargetRef = useRef(null);
  useCustomScrollTrigger({
    target: scrollTriggerTargetRef?.current || window,
    threshold: 100,
  });

  return (
    <Box ref={scrollTriggerTargetRef} sx={style}>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
      <Box sx={element}>something</Box>
    </Box>
  );
};

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
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

const element = {
  py: 10,
  flex: 1,
  backgroundColor: '#343c51',
};

export default StreamBody;
