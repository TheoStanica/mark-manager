import React from 'react';
import useWindowDimension from '../../../core/hooks/useWindowDimension';

import { MonthView } from '@devexpress/dx-react-scheduler-material-ui';

const SCHEDULER_HEADER_HEIGHT = 29;
const SCHEDULER_TOOLBAR_HEIGHT = 65;
const APPBAR_HEIGHT = 64;

interface Props {
  onClick?: (a: any) => any;
}

const MonthCell = ({
  onClick,
  ...props
}: MonthView.TimeTableCellProps & Props) => {
  const [, windowHeight] = useWindowDimension();

  const isValidCell = () => {
    return props.startDate > new Date();
  };

  return (
    <MonthView.TimeTableCell
      {...props}
      style={{
        height: `${
          (windowHeight -
            SCHEDULER_HEADER_HEIGHT -
            SCHEDULER_TOOLBAR_HEIGHT -
            APPBAR_HEIGHT) /
          6
        }px`,
      }}
      onClick={() => {
        if (isValidCell()) {
          onClick?.(props);
        }
      }}
      onDoubleClick={() => {}}
    />
  );
};

export default MonthCell;
