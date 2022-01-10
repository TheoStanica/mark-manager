import { Redirect, Route } from 'react-router-dom';
import useAuthenticated from '../hooks/useAuthenticated';

const ApplicationRoute = ({ children, onlyPublic = false, ...props }) => {
  const authenticated = useAuthenticated();
  return (
    <Route
      {...props}
      render={() => {
        if (onlyPublic) {
          return !authenticated ? children : <Redirect to="/dashboard" />;
        }
        return authenticated ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default ApplicationRoute;
