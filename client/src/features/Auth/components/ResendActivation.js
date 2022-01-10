import { Box, Link } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useResendActivationMutation } from '../../../api/auth/api';

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
        <Box mt={2} display="flex" justifyContent="center">
          Sent <CheckCircleIcon color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default ResendActivation;
