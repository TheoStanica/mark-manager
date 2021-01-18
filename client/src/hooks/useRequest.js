import { useState } from 'react';
import axiosInstance from '../api/buildClient';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axiosInstance[method](url, {
        ...body,
        ...props,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

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
