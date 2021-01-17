import { useState } from 'react';
import axiosInstance from '../api/buildClient';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      console.log('will send these props,', props);
      setErrors(null);
      const response = await axiosInstance[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (err) {
      setErrors(err);
    }
  };
  return [doRequest, errors];
};

export default useRequest;
