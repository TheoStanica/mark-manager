import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import { getUserInfo } from '../../redux/actions/userActions';
import { StyledSettings } from './styles';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  AppointmentTooltip,
  AppointmentForm,
  WeekView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@mui/material/Paper';

const PlannerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const data = [
    {
      title: 'Website Re-Design Plan',
      startDate: '2021-10-29T09:45',
      endDate: '2021-10-29T19:45',
    },
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2021, 10, 29, 9, 30),
      endDate: new Date(2021, 10, 29, 13, 30),
    },
  ];

  return (
    <>
      <VerticalMenu />
      {/* <StyledSettings> */}

      <StyledSettings>
        <Scheduler data={data}>
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName="Month"
            onCurrentDateChange={(date) => setCurrentDate(date)}
          />
          <MonthView />
          {/* <MonthView.Layout setScrollingStrategy="changeVerticalScroll" /> */}
          <WeekView startDayHour={7} endDayHour={20} />
          <DayView startDayHour={7} endDayHour={20} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm readOnly />
        </Scheduler>
      </StyledSettings>
      {/* </StyledSettings> */}
    </>
  );
};

export default PlannerPage;
