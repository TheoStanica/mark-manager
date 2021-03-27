import React from 'react';
import { StyledTimeline } from './styles';

const Timeline = ({ children, id }) => {
  return <StyledTimeline key={id}>{children}</StyledTimeline>;
};

export default Timeline;
