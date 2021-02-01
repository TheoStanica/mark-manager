import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import ErrorDisplay from '../components/DisplayErrors';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

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
          {<ErrorDisplay />}
        </form>
      </div>
    </div>
  );
};

export default Login;
