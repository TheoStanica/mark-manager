import { useScrollTrigger } from '@mui/material';
import { useEffect, useContext } from 'react';

import { ScrollTriggerContext } from '../components/ScrollTriggerProvider/ScrollTriggerProvider';

const useCustomScrollTrigger = (options) => {
  const trigger = useScrollTrigger({ ...options });
  const { contextTrigger, setContextTrigger } = useContext(
    ScrollTriggerContext
  );

  useEffect(() => {
    setContextTrigger(trigger);
  }, [trigger]);

  return contextTrigger;
};

export default useCustomScrollTrigger;
