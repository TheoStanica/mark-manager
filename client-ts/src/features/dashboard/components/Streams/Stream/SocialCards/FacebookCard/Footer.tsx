import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';

import LikeIcon from '@mui/icons-material/ThumbUp';
import { Container } from '@mui/system';
import { StyleSheet } from '../../../../../../../core/types/stylesheet';
import {
  IFacebookStreamData,
  IStreamPreference,
} from '../../../../../../../api/user/types';

import { IFacebookPageFeedData } from '../../../../../../../api/facebook/types';

interface Props {
  data: IFacebookPageFeedData;
  stream: IStreamPreference<IFacebookStreamData>;
}

const Footer = ({ data, stream }: Props) => {
  const likes = useMemo(() => {
    return data.likes.summary.total_count;
  }, [data.likes.summary.total_count]);

  return (
    <Container maxWidth={false} sx={styles().container}>
      <Box sx={styles().box}>
        <Tooltip title="Retweet" arrow>
          <IconButton size="small" disabled>
            <LikeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {likes}
      </Box>
    </Container>
  );
};

const styles = (): StyleSheet => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px !important',
    paddingRight: '8px !important',
    gap: 2,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Footer;
