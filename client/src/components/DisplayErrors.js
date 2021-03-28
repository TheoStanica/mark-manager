import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors } from '../redux/actions/errorsActions';
import { resendActivationEmail } from '../redux/actions/userActions';
import Button from './Button/Button';
import Message from './Message/Message';

const DisplayErrors = () => {
  const { errors } = useSelector((state) => state.errorsReducer);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const clearTmeout = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const renderAccountNotActivated = ({ message, userID }) => {
      setErrorMessages(
        <Message type="error">
          <ul style={{ listStyle: 'none' }}>
            <li key={message}>{message}</li>
          </ul>
          <p style={{ marginBottom: '0.5rem' }}>Haven't received an email?</p>
          <Button onClick={() => dispatch(resendActivationEmail(userID))}>
            Send New Activation Email
          </Button>
        </Message>
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
          <Message type="error">
            <ul style={{ listStyle: 'none' }}>
              {errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </Message>
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
