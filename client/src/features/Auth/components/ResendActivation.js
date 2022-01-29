import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { useResendActivationMutation } from '../../../api/auth/api';
import Success from '../../../core/components/FetchStatus/Success';

const ResendActivation = ({ email, requestMessage, sx }) => {
  const [resendActivation, { isSuccess }] = useResendActivationMutation();
  const sendNewActivationEmail = async (e) => {
    e.preventDefault();
    await resendActivation({ email });
  };

  return (
    <Box sx={sx}>
      <Link
        onClick={sendNewActivationEmail}
        component="button"
        variant="body2"
        textAlign="start"
      >
        {requestMessage || "Didn't get your activation code? Request a new one"}
      </Link>
      {isSuccess && (
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Typography>Sent</Typography>
          <Success noMessage style={{ width: 48 }} />
        </Box>
      )}
    </Box>
  );
};

export default ResendActivation;
