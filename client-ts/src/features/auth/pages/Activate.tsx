import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PublicNavigation from '../../../core/components/PublicNavbar';
import Loading from '../../../core/components/FetchStatus/Loading';
import Failure from '../../../core/components/FetchStatus/Failure';
import Success from '../../../core/components/FetchStatus/Success';
import { useActivateMutation } from '../../../api/auth';

const Activate = () => {
  const { activationToken } = useParams();
  const [activate, { isLoading, isError, isSuccess, error }] =
    useActivateMutation();

  useEffect(() => {
    const activateAccount = async () => {
      await activate({ activationToken });
    };
    activateAccount();
  }, [activationToken, activate]);

  return (
    <>
      <PublicNavigation transparent appBarStyle={{ position: 'absolute' }} />
      <Container sx={{ minHeight: '100vh', display: 'flex' }}>
        <Box sx={contentContainerStyle}>
          <Box sx={centeredContainer}>
            {isLoading && (
              <Loading
                message="Hold on.. Activating your account.."
                circularProgressProps={{ size: 100 }}
              />
            )}
            {isSuccess && (
              <Success
                message="Account activated!"
                style={{ width: 148, height: 148 }}
              />
            )}
            {isError && error && (
              <Failure error={error} style={{ height: 110, width: 110 }} />
            )}
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
