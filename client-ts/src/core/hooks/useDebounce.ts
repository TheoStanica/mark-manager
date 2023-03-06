import { useState, useEffect } from 'react';

interface Props {
  initialValue: any;
  delay: number;
}

const useDebounce = ({ initialValue = '', delay }: Props) => {
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
