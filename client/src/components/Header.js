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
        <div className="right menu">
          {renderNavButton('/login', 'Login', 'float right item')}
          {renderNavButton('/register', 'Register', 'float right item')}
        </div>
      );
    } else {
      return (
        <div className="right menu">
          {renderNavButton(
            '/dashboard',
            'Dashboard',
            'float right item',
            onUserCheckLoggedIn
          )}
          {renderNavButton('/', 'Logout', 'float right item', handleLogout)}
        </div>
      );
    }
  };

  return (
    <div className="ui  menu">
      <div className="ui container">
        {renderNavButton('/', 'Mark', 'item', onUserCheckLoggedIn)}
        {renderHeader()}
      </div>
    </div>
  );
};

export default Header;
