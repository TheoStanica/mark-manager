import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../api/buildClient';

const Register = (user) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        email,
        password,
      });
      if (response && response.status === 201) {
        console.log(response.data);
      }
    } catch (err) {
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

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="ui middle aligned  grid ">
      <div className=" column">
        <div className="ui header">Register</div>
        <form className="ui large form  " onSubmit={submitRegister}>
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
              Register
            </button>
            {errors}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
