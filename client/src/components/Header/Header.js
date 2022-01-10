import React from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar, StyledList, StyledItem } from './styles';
import Logo from '../../assets/Pictures/Logo';
import Mark from '../../assets/Pictures/Mark';

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
        {/* <Logo size={46} bgColor={'#068abc'} /> */}
        <Mark size={46} />
      </Link>
      <StyledList>
        {renderNavButton({ route: '/login', text: 'Login' })}
        {renderNavButton({ route: '/register', text: 'Register' })}
      </StyledList>
    </StyledNavbar>
  );
};

export default Header;
