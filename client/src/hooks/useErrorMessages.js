import { useEffect, useState } from 'react';

const useErrorMessages = ({ errors }) => {
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    if (errors) {
      return setErrorMessages(
        <div className="alert alert-danger">
          <ul className="my-0">
            {errors.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      setErrorMessages(null);
    }
  }, [errors]);

  return [errorMessages, setErrorMessages];
};

export default useErrorMessages;