import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import ErrorDisplay from '../DisplayErrors';
import { Link } from 'react-router-dom';
import './Login.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login">
      <h1 className="header">Login</h1>
      <form className="" onSubmit={submitLogin}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          minLength={6}
        />
        <div className="small-text mb-2">
          <Link to="/password/reset" className="me-3">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="mb-1">
          Sign In
        </Button>
        <div className="d-flex small-text mb-1">
          Don't have an account?
          <Link to="/register" className="ml-05">
            Sign Up
          </Link>
        </div>
        <div className="errors">
          <ErrorDisplay />
        </div>
      </form>
    </div>
  );
};

export default Login;
