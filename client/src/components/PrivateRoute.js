import { Redirect, Route } from 'react-router-dom';
import { isLoggedin } from '../services/isLoggedIn';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
