import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useErrorMessages from '../hooks/useErrorMessages';
import { resetErrors } from '../redux/actions/errorsActions';
import { registerUser } from '../redux/actions/userActions';

const Register = () => {
  const user = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorsReducer);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages] = useErrorMessages(errors);

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  const submitRegister = async (e) => {
    e.preventDefault();

    dispatch(registerUser({ email, password }));
    // ????????????????
    // return <Redirect to="/login" />;
    // history.push('/login');
  };

  if (user.accessToken && user.refreshToken) {
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
        </form>
      </div>
    </div>
  );
};

export default Register;
