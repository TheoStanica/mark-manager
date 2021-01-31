import { useSelector } from 'react-redux';
import useErrorMessages from '../hooks/useErrorMessages';

const DisplayErrors = () => {
  const errors = useSelector((state) => state.errorsReducer);
  const [errorMessages] = useErrorMessages(errors);

  return errorMessages;
};

export default DisplayErrors;
