import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onUserNotLoggedIn, onUserCheckLoggedIn }) => {
  const handleLogout = () => {
    localStorage.clear();
    onUserNotLoggedIn(null);
  };

  let buttons;
  if (!user) {
    buttons = (
      <div className="ui container ">
        <Link to="/" className="item" onClick={onUserCheckLoggedIn}>
          Mark
        </Link>
        <div className="right menu">
          <Link to="/login" className="float right item">
            Login
          </Link>
          <Link to="/register" className="float right item">
            Register
          </Link>
        </div>
      </div>
    );
  } else {
    buttons = (
      <div className="ui container ">
        <Link to="/" className="item" onClick={onUserCheckLoggedIn}>
          Mark
        </Link>
        <div className="right menu">
          <Link to="/dashboard" className="item" onClick={onUserCheckLoggedIn}>
            Dashboard
          </Link>
          <Link to="/" className="item" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return <div className="ui  menu">{buttons}</div>;
};

export default Header;
