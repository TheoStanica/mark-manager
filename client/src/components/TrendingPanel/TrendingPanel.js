import React from 'react';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import styled from 'styled-components';

const TrendingPanel = () => {
  return (
    <StyledPanelWrapper>
      <Typography variant="h6" mb={2}>
        Trending Right Now
      </Typography>

      <StyledChipWrapper>
        <Stack direction="column" spacing={1} mr={1}>
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting2'} color="primary" clickable />
          <Chip label={'#EarlyVoting3'} color="primary" clickable />
          <Chip label={'#EarlyVoting4'} color="primary" clickable />
          <Chip label={'#EarlyVoting5'} color="primary" clickable />
          <Chip label={'#EarlyVoting6'} color="primary" clickable />
          <Chip label={'#EarlyVoting7'} color="primary" clickable />
          <Chip label={'#EarlyVoting9'} color="primary" clickable />
          <Chip label={'#EarlyVoting00gggggggg0'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
          <Chip label={'#EarlyVoting'} color="primary" clickable />
        </Stack>
      </StyledChipWrapper>
    </StyledPanelWrapper>
  );
};

export default TrendingPanel;

const StyledPanelWrapper = styled.div`
  margin-left: 16px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
`;

const StyledChipWrapper = styled.div`
  flex: 1;
  max-height: 300px;
  overflow: scroll;
`;
