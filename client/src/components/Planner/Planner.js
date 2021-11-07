import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  AppointmentForm,
  WeekView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import TimeTableCell from './TimeTableCell';
import AppointmentComponent from './AppointmentComponent';

const Planner = () => {
  const { scheduledTweets, scheduledTweetsById } = useSelector(
    (state) => state.scheduledTweetsReducer
  );
  const { twitterAccountsById } = useSelector((state) => state.twitterReducer);
  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formMetadata, setFormMetadata] = useState({});

  const processScheduledTweets = useCallback(() => {
    return scheduledTweets.map((tweet) => {
      return {
        title:
          twitterAccountsById[scheduledTweetsById[tweet].twitterUserId]
            .screenName,
        startDate: new Date(scheduledTweetsById[tweet].scheduled_at),
        endDate: new Date(
          new Date(scheduledTweetsById[tweet].scheduled_at).getTime() + 1
        ),
        id: scheduledTweetsById[tweet].id_str,
        status: scheduledTweetsById[tweet].scheduled_status,
        userId: scheduledTweetsById[tweet].twitterUserId,
        text: scheduledTweetsById[tweet].text,
      };
    });
  }, [scheduledTweets, scheduledTweetsById, twitterAccountsById]);

  useEffect(() => {
    if (scheduledTweets) {
      const processedTweets = processScheduledTweets();
      console.log(processedTweets);
      setData(processedTweets);
    }
  }, [scheduledTweets, processScheduledTweets]);

  return (
    <Scheduler data={data} firstDayOfWeek={1}>
      <ViewState />
      <Toolbar />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton />
      <MonthView
        timeTableCellComponent={(props) => <TimeTableCell {...props} />}
      />

      <WeekView />
      <DayView />
      <EditingState />
      <Appointments
        appointmentComponent={(props) => (
          <AppointmentComponent
            {...props}
            onClick={(e) => {
              setFormMetadata(e.data);
              setFormVisible(true);
            }}
          />
        )}
      />
      <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        appointmentData={formMetadata}
      />
      <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
      <ConfirmationDialog />
    </Scheduler>
  );
};

export default Planner;
