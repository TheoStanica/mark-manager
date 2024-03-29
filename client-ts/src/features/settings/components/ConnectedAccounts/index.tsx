import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ConnectedAccount from './ConnectedAccount';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../../../core/components/FetchStatus/Loading';
import { useFetchConnectedAccountsQuery } from '../../../../api/social';

const ConnectedAccounts = () => {
  const { data, isLoading } = useFetchConnectedAccountsQuery();

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2 }} elevation={5}>
        <Typography component="h1" variant="h5" mb={2}>
          Connected Accounts
        </Typography>
        <Box sx={container}>
          {isLoading && (
            <Loading
              circularProgressProps={{ sx: { margin: 'auto' } }}
              noMessage
            />
          )}
          {data?.map((account) => (
            <ConnectedAccount key={uuidv4()} account={account} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export default ConnectedAccounts;
