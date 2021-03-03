import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = ({ className }) => {
  const renderNavButton = ({ route, text, className, onClick }) => {
    return (
      <li className="item">
        <Link to={route} className={className} onClick={onClick}>
          {text}
        </Link>
      </li>
    );
  };

  return (
    <nav className={`navbar ${className}`}>
      <Link to="/">
        <img src="./MarkLogo.svg" alt="Project Mark Logo" />
      </Link>
      <ul className="navbar-items">
        {renderNavButton({ route: '/login', text: 'Login' })}
        {renderNavButton({ route: '/register', text: 'Register' })}
      </ul>
    </nav>
  );
};

export default Header;
