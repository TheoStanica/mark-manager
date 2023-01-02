import { useLottie } from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { LottieAnimations } from '../../../assets/Lottie';
import useApplicationTheme from '../../hooks/useApplicationTheme';

const defaultOptions = {
  animationData: LottieAnimations.successLight,
  loop: false,
  autoPlay: true,
};

const defaultStyle = {
  height: 58,
  width: 58,
};

const Success = ({
  message = 'Success',
  noMessage = false,
  options,
  style,
}: any) => {
  const { mode } = useApplicationTheme();
  const [lottieOptions, setLottieOptions] = useState({
    ...defaultOptions,
    ...options,
  });

  const { View } = useLottie(lottieOptions, { ...defaultStyle, ...style });

  useEffect(() => {
    let animation: any = null;
    if (mode === 'dark') {
      animation = LottieAnimations.successDark;
    } else {
      animation = LottieAnimations.successLight;
    }
    setLottieOptions((prev: any) => ({ ...prev, animationData: animation }));
  }, [mode]);

  return (
    <>
      {View}
      {!noMessage && message}
    </>
  );
};

export default Success;
