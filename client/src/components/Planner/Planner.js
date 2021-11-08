import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
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
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import TimeTableCell from './TimeTableCell';
import AppointmentComponent from './AppointmentComponent';
import useWindowDimension from '../../hooks/useWindowDimension';
import AppointmentFormComponent from './AppointmentFormComponent';

const Planner = () => {
  const { scheduledTweets, scheduledTweetsById } = useSelector(
    (state) => state.scheduledTweetsReducer
  );
  const { twitterAccountsById } = useSelector((state) => state.twitterReducer);
  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formMetadata, setFormMetadata] = useState({});
  useWindowDimension();

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
    const processedTweets = processScheduledTweets();
    console.log(processedTweets);
    setData(processedTweets);
  }, [scheduledTweets, processScheduledTweets]);

  const isValid = (appointment) => {
    return appointment.startDate > new Date();
  };

  return (
    <Scheduler data={data} firstDayOfWeek={1}>
      <ViewState />
      <Toolbar />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton />
      <MonthView
        timeTableCellComponent={(props) => (
          <TimeTableCell
            {...props}
            onClick={(e) => {
              console.log(e);
              setFormMetadata({
                startDate: e.startDate,
                endDate: e.endDate,
              });
              setFormVisible(true);
            }}
          />
        )}
      />
      <WeekView />
      <DayView />
      <EditingState
        onCommitChanges={(e) => console.log('updating order or whatever', e)}
      />
      <IntegratedEditing />

      <Appointments
        appointmentComponent={(props) => (
          <AppointmentComponent
            {...props}
            onClick={(appointment) => {
              setFormMetadata(appointment.data);
              setFormVisible(true);
            }}
          />
        )}
      />
      <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        appointmentData={formMetadata}
        basicLayoutComponent={AppointmentFormComponent}
        dateEditorComponent={() => null}
        textEditorComponent={() => null}
        booleanEditorComponent={() => null}
        radioGroupComponent={() => null}
        labelComponent={() => null}
        // commandButtonComponent={() => null}
      />
      <DragDropProvider allowDrag={isValid} />
      <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />

      <ConfirmationDialog />
    </Scheduler>
  );
};

export default Planner;
