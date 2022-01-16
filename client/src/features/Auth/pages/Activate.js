import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActivateMutation } from '../../../api/auth/api';
import GradientBackground from '../../../core/components/GradientBackground';
import PublicNavigation from '../../../core/components/PublicNavigation';
import useApplicationTheme from '../../../core/hooks/useApplicationTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DisplayError from '../../../core/components/DisplayError';
import CancelIcon from '@mui/icons-material/Cancel';

const Activate = () => {
  const { activationToken } = useParams();
  const { mode } = useApplicationTheme();
  const [
    activate,
    { isLoading, isError, isSuccess, error },
  ] = useActivateMutation();

  useEffect(() => {
    const activateAccount = async () => {
      await activate({ activationToken });
    };
    activateAccount();
  }, [activationToken, activate]);

  const loadingContent = () => (
    <>
      <CircularProgress
        sx={{ mb: 2 }}
        color={mode === 'dark' ? 'secondary' : 'primary'}
      />
      <Typography>Hold on.. Activating your account</Typography>
    </>
  );

  const successContent = () => (
    <>
      <CheckCircleIcon
        sx={{ mb: 2, fontSize: 50 }}
        color={mode === 'dark' ? 'secondary' : 'primary'}
      />
      <Typography>Account activated!</Typography>
    </>
  );

  const errorContent = () => (
    <>
      <CancelIcon
        sx={{ mb: 2, fontSize: 50 }}
        color={mode === 'dark' ? 'secondary' : 'primary'}
      />
      <DisplayError error={error} simple />
    </>
  );

  return (
    <>
      <PublicNavigation transparent appBarStyle={{ position: 'absolute' }} />
      <GradientBackground />
      <Container sx={{ minHeight: '100vh', display: 'flex' }}>
        <CssBaseline />
        <Box sx={contentContainerStyle}>
          <Box sx={centeredContainer}>
            {isLoading && loadingContent()}
            {isSuccess && successContent()}
            {isError && errorContent()}
          </Box>
        </Box>
      </Container>
    </>
  );
};

const contentContainerStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const centeredContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default Activate;
