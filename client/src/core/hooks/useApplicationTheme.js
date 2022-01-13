import { useContext } from 'react';
import { ThemeContext } from '../components/AppThemeProvider/AppThemeProvider';

const useApplicationTheme = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return { toggleTheme, mode };
};

export default useApplicationTheme;
