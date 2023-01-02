import { Box, Link, SxProps, Typography } from '@mui/material';
import React from 'react';
import { useResendActivationMutation } from '../../../api/auth';
import Success from '../../../core/components/FetchStatus/Success';

interface Props {
  email: string;
  requestMessage?: string;
  sx?: SxProps;
}

const ResendActivation = ({ email, requestMessage, sx }: Props) => {
  const [resendActivation, { isSuccess }] = useResendActivationMutation();
  const sendNewActivationEmail = async (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    await resendActivation({ email });
  };

  return (
    <Box sx={sx}>
      <Link
        onClick={(e) => sendNewActivationEmail(e)}
        component="button"
        variant="body2"
        textAlign="start"
      >
        {requestMessage || "Didn't get your activation code? Request a new one"}
      </Link>
      {isSuccess && (
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Success noMessage style={{ width: 48 }} />
          <Typography>Activation email sent</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResendActivation;
