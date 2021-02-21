import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../redux/actions/userActions';
import DisplayErrors from './DisplayErrors';
import DisplayUserMessages from './DisplayUserMessages';

const ResetpasswordRequest = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const requestReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ email }));
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">Reset Password</h1>
      <div className="flex-center row">
        <form
          className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto"
          onSubmit={requestReset}
        >
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              minLength="2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form1Example1">
              Email address
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-3">
            Reset Password
          </button>
          <DisplayUserMessages />
          <DisplayErrors />
        </form>
      </div>
    </div>
  );
};

export default ResetpasswordRequest;
