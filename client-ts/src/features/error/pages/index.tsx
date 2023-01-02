import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status}:{error.statusText}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
