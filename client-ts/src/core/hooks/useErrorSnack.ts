import { SerializedError } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { ApplicationError } from '../../api';

interface Props {
  error?: ApplicationError | SerializedError;
}

const useErrorSnack = ({ error }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const sendMessage = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (error && 'data' in error) {
      if (typeof error.data === 'string') {
        sendMessage(error.data);
        return;
      }
      error.data.errors.map((error) => sendMessage(error.message));
    }
  }, [error, sendMessage]);
};

export default useErrorSnack;
