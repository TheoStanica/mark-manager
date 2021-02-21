import React from 'react';
import ResetpasswordRequest from '../components/ResetPasswordRequest';
import ResetPasswordUpdate from '../components/ResetPasswordUpdate';
import { useQuery } from '../hooks/useQuery';

const ResetPassword = () => {
  const query = useQuery();
  return query.get('token') ? (
    <ResetPasswordUpdate />
  ) : (
    <ResetpasswordRequest />
  );
};

export default ResetPassword;
