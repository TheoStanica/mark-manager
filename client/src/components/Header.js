import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import { isLoggedin } from '../services/isLoggedIn';

const Header = () => {
  useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  const renderNavButton = (route, text, className, onClick) => {
    return (
      <Link to={route} className={className} onClick={onClick}>
        {text}
      </Link>
    );
  };

  const renderHeader = () => {
    if (!isLoggedin()) {
      return (
        <ul className="navbar-nav ms-auto">
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
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            {renderNavButton('/dashboard', 'Dashboard', 'nav-link')}
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
