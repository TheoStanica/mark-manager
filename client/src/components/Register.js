import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useErrorMessages from '../hooks/useErrorMessages';
import useRequest from '../hooks/useRequest';

const Register = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [doRegisterRequest, errors] = useRequest({
    url: '/api/auth/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => handleRegisterSuccess(),
  });
  const errorMessages = useErrorMessages({ errors });

  const handleRegisterSuccess = () => {
    setMessage(
      <div className="alert alert-primary">
        Account created! Please check your email to confirm your account!
      </div>
    );
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    await doRegisterRequest();
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="mt-5">
      <h1 className="text-center">Register</h1>
      <div className="flex-center row">
        <form
          className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto"
          onSubmit={submitRegister}
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
            Register
          </button>
          {errorMessages}
          {message}
        </form>
      </div>
    </div>
  );
};

export default Register;
