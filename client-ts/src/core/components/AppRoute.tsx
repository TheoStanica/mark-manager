import { Navigate } from 'react-router-dom';
import useAuthenticated from '../hooks/useAuthenticated';

export interface Props {
  children: JSX.Element;
  onlyPublic?: boolean;
}

const ApplicationRoute = ({ children, onlyPublic }: Props) => {
  const authenticated = useAuthenticated();

  // console.log('authenticated', authenticated);

  if (onlyPublic) {
    if (authenticated) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ApplicationRoute;
