import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '../hooks/useQuery';
import { setErrors } from '../redux/actions/errorsActions';
import { userResetPassword } from '../redux/actions/userActions';
import DisplayErrors from './DisplayErrors';
import DisplayUserMessages from './DisplayUserMessages';

const ResetPasswordUpdate = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const newPasswordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const dispatchErrors = (message) => {
    dispatch(
      setErrors({
        errors: [{ message: message }],
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPasswordRef.current.value !== repeatPasswordRef.current.value ||
      newPasswordRef.current.value === ''
    ) {
      dispatchErrors('New Password does not match');
    } else {
      dispatch(
        userResetPassword({ token: query.get('token'), password: newPassword })
      );
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">Set New Password</h1>
      <div className="flex-center row">
        <form
          className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col mb-2">
              <div className="form-group">
                <label htmlFor="inputNewPassword">New Password</label>
                <input
                  ref={newPasswordRef}
                  className="form-control"
                  id="inputNewPassword"
                  type="password"
                  minLength="4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputRepeatNewPassword">
                  Repeat New Password
                </label>
                <input
                  ref={repeatPasswordRef}
                  className="form-control"
                  id="inputRepeatNewPassword"
                  type="password"
                  minLength="4"
                  value={repeatNewPassword}
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Save Changes
          </button>
          <DisplayErrors />
          <DisplayUserMessages />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordUpdate;
