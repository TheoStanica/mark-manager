import React from 'react';
import { Link } from 'react-router-dom';
import { Assets } from '../../assets';
import { StyledNavbar, StyledList, StyledItem } from './styles';

const Header = ({ normal }) => {
  const renderNavButton = ({ route, text, className, onClick }) => {
    return (
      <StyledItem>
        <Link to={route} className={className} onClick={onClick}>
          {text}
        </Link>
      </StyledItem>
    );
  };

  return (
    <StyledNavbar normal={normal ? true : false}>
      <Link to="/">
        <img src={Assets.Pictures.MarkLogo} alt="Project Mark Logo" />
      </Link>
      <StyledList>
        {renderNavButton({ route: '/login', text: 'Login' })}
        {renderNavButton({ route: '/register', text: 'Register' })}
      </StyledList>
    </StyledNavbar>
  );
};

export default Header;
