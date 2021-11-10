import React from 'react';
import useWindowDimension from '../../hooks/useWindowDimension';

import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';

const SCHEDULER_HEADER_HEIGHT = 28;
const SCHEDULER_TOOLBAR_HEIGHT = 64;

const TimeTableCell = ({ onClick, ...props }) => {
  const [, windowHeight] = useWindowDimension();

  const isValidCell = () => {
    return props.startDate > new Date();
  };

  return (
    <MonthView.TimeTableCell
      {...props}
      style={{
        height: `${
          (windowHeight - SCHEDULER_HEADER_HEIGHT - SCHEDULER_TOOLBAR_HEIGHT) /
          6
        }px`,
      }}
      onClick={() => {
        if (isValidCell()) {
          onClick(props);
        }
      }}
      onDoubleClick={() => {}}
    />
  );
};

export default TimeTableCell;
