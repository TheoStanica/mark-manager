import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../api/buildClient';

const Login = ({ onUserChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const history = useHistory();

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
        history.push('/dashboard');
      }
    } catch (err) {
      console.log('LOGIN ERRROR', err);
      setErrors(
        <div>
          <h4>Ooops....</h4>
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="ui middle aligned  grid ">
      <div className="ui column">
        <div className="ui header">Login</div>
        <form className="ui large form  " onSubmit={submitLogin}>
          <div className="ui stacked segment">
            <div className="  field ">
              <label>Email</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="  field">
              <label>Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="ui fluid large primary submit button">
              Login
            </button>
            {errors}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
