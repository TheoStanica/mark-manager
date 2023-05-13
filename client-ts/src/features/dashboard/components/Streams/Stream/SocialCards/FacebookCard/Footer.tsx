import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

import LikeIcon from '@mui/icons-material/ThumbUp';
import PositiveIcon from '@mui/icons-material/SentimentVerySatisfied';
import NegativeIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Container } from '@mui/system';
import { StyleSheet } from '../../../../../../../core/types/stylesheet';
import {
  IFacebookStreamData,
  IStreamPreference,
} from '../../../../../../../api/user/types';

import { IFacebookPageFeedData } from '../../../../../../../api/facebook/types';
import { useGetSentimentMutation } from '../../../../../../../api/ml';

interface Props {
  data: IFacebookPageFeedData;
  stream: IStreamPreference<IFacebookStreamData>;
}

const Footer = ({ data, stream }: Props) => {
  const [getSentiment, { data: sentimentData }] = useGetSentimentMutation();

  const likes = useMemo(() => {
    return data.likes.summary.total_count;
  }, [data.likes.summary.total_count]);

  useEffect(() => {
    if (data.message) {
      getSentiment({ message: data.message });
    }
  }, [data, getSentiment]);

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
      {sentimentData?.sentiment === 'Positive' && (
        <Box sx={styles().box}>
          <Tooltip title="Positive sentiment" arrow>
            <PositiveIcon fontSize="small" htmlColor="#17bf63" />
          </Tooltip>
        </Box>
      )}
      {sentimentData?.sentiment === 'Negative' && (
        <Box sx={styles().box}>
          <Tooltip title="Negative sentiment" arrow>
            <NegativeIcon fontSize="small" htmlColor="#e0245e" />
          </Tooltip>
        </Box>
      )}
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
