import { SerializedError } from '@reduxjs/toolkit';
import { ApplicationError } from '../../api';

export const isApplicationError = (
  error?: ApplicationError | SerializedError
): boolean => {
  if (!error) {
    return false;
  }

  if (!('data' in error)) {
    return false;
  }

  if (typeof error.data === 'string') {
    return false;
  }

  return true;
};

export const isAccountNotActivatedError = (
  error?: ApplicationError | SerializedError
): boolean => {
  if (!error) {
    return false;
  }

  if (!('data' in error)) {
    return false;
  }

  if (typeof error?.data === 'string') {
    return false;
  }

  if (error?.data.errors[0]?.errorType === 'accountNotActivated') {
    return true;
  }

  return false;
};
