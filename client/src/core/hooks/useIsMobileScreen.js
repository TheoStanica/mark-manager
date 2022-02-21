import { useMediaQuery, useTheme } from '@mui/material';

const useIsMobileScreen = () => {
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return isLowerSizeScreen;
};

export default useIsMobileScreen;
