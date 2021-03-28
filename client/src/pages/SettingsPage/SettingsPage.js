import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSettingsComponent from '../../components/ProfileSettings/ProfileSettingsComponent';
import PasswordSettingsComponent from '../../components/PasswordSettingsComponent';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import ListMenu from '../../components/ListMenu/ListMenu';
import ListItem from '../../components/ListItem/ListItem';
import ListMenuHeader from '../../components/ListMenu/ListMenuHeader';
import { getUserInfo } from '../../redux/actions/userActions';
import { StyledSettings, StyledHeader, StyledSettingsRow } from './styles';

const SettingsPage = () => {
  useSelector((state) => state.userReducer.present);
  const [option, setOption] = useState('profile');
  const profileRef = useRef(null);
  const passwordRef = useRef(null);
  const [isProfileActive, setIsProfileActive] = useState(true);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const renderSection = () => {
    switch (option) {
      case 'profile':
        return <ProfileSettingsComponent />;
      case 'password':
        return <PasswordSettingsComponent />;
      default:
        return <ProfileSettingsComponent />;
    }
  };

  const resetActive = () => {
    setIsProfileActive(false);
    setIsSettingsActive(false);
  };

  return (
    <>
      <VerticalMenu />
      <StyledSettings>
        <StyledHeader>Settings</StyledHeader>
        <StyledSettingsRow>
          <ListMenu
            style={{
              marginRight: '1rem',
              marginBottom: '1rem',
              flex: ' 0 0 25%',
            }}
          >
            <ListMenuHeader>Profile Settings</ListMenuHeader>
            <ListItem
              ref={profileRef}
              text="Account"
              onClick={() => {
                setOption('profile');
                resetActive();
                setIsProfileActive(!isProfileActive);
              }}
              active={isProfileActive}
            />
            <ListItem
              ref={passwordRef}
              text="Password"
              onClick={() => {
                setOption('password');
                resetActive();
                setIsSettingsActive(!isSettingsActive);
              }}
              active={isSettingsActive}
            />
          </ListMenu>
          {renderSection()}
        </StyledSettingsRow>
      </StyledSettings>
    </>
  );
};

export default SettingsPage;
