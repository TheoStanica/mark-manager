import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import DisplayErrors from '../../components/DisplayErrors';
import DisplayUserMessages from '../../components/DisplayUserMessages';
import InputField from '../../components/InputField/InputField';
import { registerUser } from '../../redux/actions/userActions';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="register">
      <h1 className="header">Register</h1>
      <form onSubmit={submitRegister}>
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
          className="mb-3"
        />
        <Button type="submit" style={{ marginBottom: '1rem' }}>
          Register
        </Button>
        <div className="d-flex small-text mb-1">
          Already have an account?
          <Link to="/login" className="ml-05">
            Sign In
          </Link>
        </div>
        <div className="messages">
          <DisplayErrors />
          <DisplayUserMessages />
        </div>
      </form>
    </div>
  );
};

export default Register;
