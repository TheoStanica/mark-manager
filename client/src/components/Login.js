import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import useErrorMessages from '../hooks/useErrorMessages';

const Login = ({ user, onUserChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [doLoginRequest, errors] = useRequest({
    url: '/api/auth/signin',
    method: 'post',
    body: { email, password },
    onSuccess: (response) => handleLoginSuccess(response),
  });
  const [errorMessages, setErrorMessages] = useErrorMessages({ errors });
  const [doRequestNewActivationEmail, errors2] = useRequest({
    url: '/api/auth/activation/resend',
    method: 'post',
    onSuccess: () => handleRequestNewActivationEmailSuccess(),
  });

  const handleLoginSuccess = (response) => {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    onUserChange();
  };

  const handleRequestNewActivationEmailSuccess = () => {
    setErrorMessages(null);
    setMessage(
      <div className="alert alert-primary">
        <ul>New activation email sent! Please check your email!</ul>
      </div>
    );
  };

  useEffect(() => {
    if (errors && errors.response.status === 403) {
      setErrorMessages(
        <div className="alert alert-danger">
          <ul>
            {errors.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
          <div
            className="btn btn-primary"
            onClick={async () =>
              await doRequestNewActivationEmail(
                errors.response.data.errors[0].userId
              )
            }
          >
            Request new Activation Email
          </div>
        </div>
      );
    }
  }, [errors]);

  const submitLogin = async (e) => {
    e.preventDefault();
    await doLoginRequest();
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="mt-5">
      <h1 className="text-center">Login</h1>
      <div className="flex-center row">
        <form
          className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto"
          onSubmit={submitLogin}
        >
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form1Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form1Example2"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form1Example2">
              Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-3">
            Sign in
          </button>
          {errorMessages}
          {message}
        </form>
      </div>
    </div>
  );
};

export default Login;
