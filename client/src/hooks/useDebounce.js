import { useState, useEffect } from 'react';

const useDebounce = (initialValue = '', delay) => {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setdebounceValue] = useState(initialValue);

  useEffect(() => {
    const debounceId = setTimeout(() => {
      setdebounceValue(actualValue);
    }, delay);

    return () => {
      clearTimeout(debounceId);
    };
  }, [actualValue, delay]);

  return [debounceValue, setActualValue];
};

export default useDebounce;
