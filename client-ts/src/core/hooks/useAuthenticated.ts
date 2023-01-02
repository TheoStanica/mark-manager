import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

const useAuthenticated = () => {
  const accessToken = useSelector(
    (state: AppState) => state.authSlice.accessToken
  );

  return accessToken ? true : false;
};

export default useAuthenticated;
