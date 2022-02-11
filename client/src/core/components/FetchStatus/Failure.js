import { useLottie } from 'lottie-react';
import React, { useEffect, useState } from 'react';
import DisplayError from '../DisplayError';
import { LottieAnimations } from '../../../assets/Lottie';
import useApplicationTheme from '../../hooks/useApplicationTheme';
import { Box } from '@mui/material';

const defaultOptions = {
  animationData: LottieAnimations.errorLight,
  loop: false,
  autoPlay: true,
};

const defaultStyle = {
  height: 46,
  width: 46,
};

const Failure = ({ error, message, noMessage = false, options, style }) => {
  const { mode } = useApplicationTheme();
  const [lottieOptions, setLottieOptions] = useState({
    ...defaultOptions,
    ...options,
  });

  const { View } = useLottie(lottieOptions, { ...defaultStyle, ...style });

  useEffect(() => {
    let animation = null;
    if (mode === 'dark') {
      animation = LottieAnimations.errorDark;
    } else {
      animation = LottieAnimations.errorLight;
    }
    setLottieOptions((prev) => ({ ...prev, animationData: animation }));
  }, [mode]);

  return (
    <>
      {View}
      {!noMessage && message}
      {error && (
        <Box sx={{ mt: 1 }}>
          <DisplayError error={error} simple />
        </Box>
      )}
    </>
  );
};

export default Failure;
