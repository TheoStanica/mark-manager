import { useEffect, useCallback } from 'react';
import useDebounce from './useDebounce';

const useWindowDimension = () => {
  const [dimension, setDimension] = useDebounce({
    initialValue: [window.innerWidth, window.innerHeight],
    delay: 100,
  });

  const debounceHandler = useCallback(() => {
    setDimension([window.innerWidth, window.innerHeight]);
  }, [setDimension]);

  useEffect(() => {
    window.addEventListener('resize', debounceHandler);
    return () => {
      window.removeEventListener('resize', debounceHandler);
    };
  }, [debounceHandler]);

  return dimension;
};

export default useWindowDimension;
