import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import AccountInfoForm from './forms/AccountInfoForm';

const Account = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" mb={2}>
          Account Information
        </Typography>
        <AccountInfoForm />
      </Paper>
    </Container>
  );
};

export default Account;
