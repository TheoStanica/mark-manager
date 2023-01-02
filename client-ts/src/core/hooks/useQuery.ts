import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const { search } = useLocation();

  const query = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  return query;
};

export default useQuery;
