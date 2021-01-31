import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import axiosInstance from '../api/buildClient';

const ActivateAccount = ({ user }) => {
  const [status, setStatus] = useState('loading');
  const { id } = useParams();

  useEffect(() => {
    const activateRequest = async () => {
      try {
        await axiosInstance.get(`/api/auth/activation/${id}`);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };
    activateRequest();
  }, [id]);

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const renderCard = (message) => {
    return (
      <div className="text-center">
        <h1> {message}</h1>
        <div className="btn btn-primary">
          <Link to="/login" className="text-light">
            Login
          </Link>
        </div>
      </div>
    );
  };

  const renderMessage = () => {
    if (status === 'loading') {
      return <div className="spinner-border"></div>;
    } else if (status === 'success') {
      return renderCard('Account activated');
    } else if (status === 'error') {
      return renderCard('Something went wrong');
    }
  };

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      {renderMessage()}
    </div>
  );
};

export default ActivateAccount;
