import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserMessages } from '../redux/actions/userActions';

const DisplayUserMessages = () => {
  const user = useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      dispatch(resetUserMessages());
    } else {
      if (user.message) {
        setMessage(<div className="alert alert-success">{user.message}</div>);
        timeout.current = setTimeout(() => {
          dispatch(resetUserMessages());
        }, 5000);
        return () => {
          clearTimeout(timeout.current);
        };
      } else {
        setMessage(null);
      }
    }
  }, [user, dispatch, isFirstRender]);

  return message;
};

export default DisplayUserMessages;
