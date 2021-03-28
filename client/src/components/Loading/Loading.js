import React from 'react';
import { Assets } from '../../assets';
import { StyledLoading } from './styles';

const Loading = () => {
  return (
    <StyledLoading>
      <img src={Assets.Pictures.Loading} alt="Loading spinner" />
      Loading...
    </StyledLoading>
  );
};

export default Loading;
