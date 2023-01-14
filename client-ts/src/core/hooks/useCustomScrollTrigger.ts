import { useScrollTrigger } from '@mui/material';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';
import { useEffect, useContext } from 'react';

import { ScrollTriggerContext } from '../components/ScrollTriggerProvider';

const useCustomScrollTrigger = (options?: UseScrollTriggerOptions) => {
  const trigger = useScrollTrigger({ ...options });
  const { contextTrigger, setContextTrigger } =
    useContext(ScrollTriggerContext);

  useEffect(() => {
    if (setContextTrigger) {
      setContextTrigger(trigger);
    }
  }, [trigger, setContextTrigger]);

  return contextTrigger;
};

export default useCustomScrollTrigger;
