import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedin } from '../services/isLoggedIn';

const PrivateRoute = ({ children, ...rest }) => {
  useSelector((state) => state.userReducer.present.accessToken);
  if (!isLoggedin()) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} render={() => children} />;
};

export default PrivateRoute;
