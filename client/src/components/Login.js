import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../api/buildClient';

const Login = ({ user, onUserChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/signin', {
        email,
        password,
      });
      if (response && response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        onUserChange();
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
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
          {errors}
        </form>
      </div>
    </div>
  );
};

export default Login;
