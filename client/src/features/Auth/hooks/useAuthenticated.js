import { useSelector } from 'react-redux';

const useAuthenticated = () => {
  const accessToken = useSelector((state) => state.authSlice.accessToken);

  return accessToken ? true : false;
};

export default useAuthenticated;
