import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setThemePreference } from '../../redux/actions/userActions';
import { StyledCheckbox, StyledLabel, StyledSlider } from './styles';

const ThemeController = () => {
  const { themePreference } = useSelector((state) => state.userReducer.present);
  const checkboxRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    themePreference === 'dark'
      ? (checkboxRef.current.checked = false)
      : (checkboxRef.current.checked = true);
  }, [themePreference]);

  const changeTheme = () => {
    dispatch(
      setThemePreference({
        themePreference: themePreference === 'light' ? 'dark' : 'light',
      })
    );
  };

  return (
    <StyledLabel style={{ marginBottom: '1rem' }}>
      <StyledCheckbox type="checkbox" onClick={changeTheme} ref={checkboxRef} />
      <StyledSlider />
    </StyledLabel>
  );
};

export default ThemeController;
