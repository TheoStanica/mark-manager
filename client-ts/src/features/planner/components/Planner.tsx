import { IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';

const Planner = () => {
  return (
    <Scheduler data={[]}>
      <ViewState currentViewName="Month" />
      <Toolbar />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton />
      <MonthView />
      <WeekView />
      <DayView />
      {/* <IntegratedEditing /> */}
    </Scheduler>
  );
};

export default Planner;
