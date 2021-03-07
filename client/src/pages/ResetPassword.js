import React from 'react';
import AuthSplash from '../components/AuthSplash/AuthSplash';
import '../components/Header/Header.css';
import ResetpasswordRequest from '../components/ResetPasswordRequest/ResetPasswordRequest';
import ResetPasswordUpdate from '../components/ResetPasswordUpdate/ResetPasswordUpdate';
import { useQuery } from '../hooks/useQuery';

const ResetPassword = () => {
  const query = useQuery();
  return query.get('token') ? (
    <AuthSplash>
      <ResetPasswordUpdate />
    </AuthSplash>
  ) : (
    <AuthSplash>
      <ResetpasswordRequest />
    </AuthSplash>
  );
};

export default ResetPassword;
