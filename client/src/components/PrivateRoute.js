import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedin } from '../services/isLoggedIn';

const PrivateRoute = ({ children, redirectIfLoggedIn, ...rest }) => {
  useSelector((state) => state.userReducer.present.accessToken);
  if (redirectIfLoggedIn) {
    if (isLoggedin()) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Route {...rest} render={() => children} />;
    }
  }
  if (!isLoggedin()) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} render={() => children} />;
};

export default PrivateRoute;
