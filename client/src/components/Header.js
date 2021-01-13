import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onUserNotLoggedIn, onUserCheckLoggedIn }) => {
  const handleLogout = () => {
    localStorage.clear();
    onUserNotLoggedIn(null);
  };

  const renderNavButton = (route, text, className, onClick) => {
    return (
      <Link to={route} className={className} onClick={onClick}>
        {text}
      </Link>
    );
  };

  const renderHeader = () => {
    if (!user) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {renderNavButton('/login', 'Login', 'nav-link')}
          </li>
          <li className="nav-item">
            {renderNavButton('/register', 'Register', 'nav-link')}
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {renderNavButton(
              '/dashboard',
              'Dashboard',
              'nav-link',
              onUserCheckLoggedIn
            )}
          </li>
          <li className="nav-item">
            {renderNavButton('/', 'Logout', 'nav-link', handleLogout)}
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <div className="container">
        {renderNavButton('/', 'Mark', 'navbar-brand')}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {renderHeader()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
