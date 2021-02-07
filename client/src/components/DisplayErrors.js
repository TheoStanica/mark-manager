import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors } from '../redux/actions/errorsActions';
import { resendActivationEmail } from '../redux/actions/userActions';

const DisplayErrors = () => {
  const { errors } = useSelector((state) => state.errorsReducer);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const clearTmeout = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const renderAccountNotActivated = ({ message, userID }) => {
      setErrorMessages(
        <div className="alert alert-danger">
          <ul>
            <li key={message}>{message}</li>
          </ul>
          <p>Haven't received an email?</p>
          <div
            className="btn btn-primary"
            onClick={async () => dispatch(resendActivationEmail(userID))}
          >
            Request new Activation Email
          </div>
        </div>
      );
    };

    if (isFirstRender) {
      dispatch(resetErrors());
      setIsFirstRender(false);
    } else {
      if (errors && errors[0].errorType === 'accountNotActivated') {
        renderAccountNotActivated(errors[0]);
      } else if (errors) {
        setErrorMessages(
          <div className="alert alert-danger">
            <ul className="my-0">
              {errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
        clearTmeout.current = setTimeout(() => {
          dispatch(resetErrors());
        }, 10000);
      } else {
        setErrorMessages(null);
      }
    }

    return () => {
      clearTimeout(clearTmeout.current);
    };
  }, [errors, isFirstRender, dispatch]);

  return errorMessages;
};

export default DisplayErrors;
