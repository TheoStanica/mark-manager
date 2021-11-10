import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import CommandLayoutComponent from './CommandLayoutComponent';
import {
  createScheduledTweet,
  removeScheduledTweet,
  updateScheduledTweet,
} from '../../redux/actions/scheduledTweetsActions';

const Planner = () => {
  useWindowDimension();
  const { scheduledTweets, scheduledTweetsById } = useSelector(
    (state) => state.scheduledTweetsReducer
  );
  const { twitterAccountsById } = useSelector((state) => state.twitterReducer);
  const [appointmentData, setAppointmentData] = useState({});
  const [currentView, setCurrentView] = useState('Month');
  const [formVisible, setFormVisible] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const processScheduledTweets = useCallback(() => {
    return scheduledTweets.map((tweet) => {
      return {
        title:
          twitterAccountsById[scheduledTweetsById[tweet].twitterUserId]
            .screenName,
        startDate: new Date(scheduledTweetsById[tweet].scheduled_at),
        endDate: new Date(
          new Date(scheduledTweetsById[tweet].scheduled_at).getTime() + 1000
        ),
        id: scheduledTweetsById[tweet].id_str,
        userId: scheduledTweetsById[tweet].twitterUserId,
        text: scheduledTweetsById[tweet].text,
      };
    });
  }, [scheduledTweets, scheduledTweetsById, twitterAccountsById]);

  useEffect(() => {
    const processedTweets = processScheduledTweets();
    setData(processedTweets);
  }, [scheduledTweets, processScheduledTweets]);

  const isValid = (appointment) => {
    return appointment.startDate > new Date();
  };

  const dispatchUpdateThunk = ({
    twitterUserId,
    scheduleAt,
    scheduledTweetId,
    text,
  }) => {
    dispatch(
      updateScheduledTweet({
        twitterUserId,
        scheduleAt,
        scheduledTweetId,
        text,
      })
    );
  };

  const dispatchCreateThunk = ({ twitterUserId, scheduleAt, text }) => {
    dispatch(
      createScheduledTweet({
        twitterUserId,
        scheduleAt,
        text,
      })
    );
  };

  const createOrUpdateTweet = (added) => {
    const { startDate, userId, text, id } = added;

    if (id) {
      dispatchUpdateThunk({
        twitterUserId: userId,
        scheduleAt: startDate,
        scheduledTweetId: id,
        text,
      });
    } else {
      dispatchCreateThunk({
        twitterUserId: userId,
        scheduleAt: startDate,
        text,
      });
    }
  };

  const getChangedDate = (changed, scheduledTweetId) => {
    const currentDate = new Date(
      scheduledTweetsById[scheduledTweetId].scheduled_at
    );
    const changedDate = new Date(changed[scheduledTweetId].startDate);
    changedDate.setHours(currentDate.getHours());
    changedDate.setMinutes(currentDate.getMinutes());
    return changedDate;
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      // created or updated scheduled tweet
      createOrUpdateTweet(added);
    }
    if (changed) {
      // drag & drop change
      const scheduledTweetId = Object.keys(changed)[0];
      let changedDate;
      if (currentView === 'Month') {
        changedDate = getChangedDate(changed, scheduledTweetId);
      } else {
        changedDate = new Date(changed[scheduledTweetId].startDate);
      }

      const { twitterUserId } = scheduledTweetsById[scheduledTweetId];
      dispatchUpdateThunk({
        twitterUserId,
        scheduleAt: changedDate,
        scheduledTweetId,
        text: undefined,
      });
    }
    if (deleted) {
      const scheduledTweetId = deleted;
      const twitterUserId = scheduledTweetsById[scheduledTweetId].twitterUserId;
      dispatch(
        removeScheduledTweet({
          twitterUserId,
          scheduledTweetId,
        })
      );
    }
  };

  return (
    <Scheduler data={data} firstDayOfWeek={1}>
      <ViewState
        currentViewName={currentView}
        onCurrentViewNameChange={setCurrentView}
      />
      <Toolbar />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton />
      <MonthView
        timeTableCellComponent={(props) => (
          <TimeTableCell
            {...props}
            onClick={(e) => {
              setAppointmentData({
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
      <EditingState onCommitChanges={commitChanges} />
      <IntegratedEditing />

      <Appointments
        appointmentComponent={(props) => (
          <AppointmentComponent
            {...props}
            onClick={(appointment) => {
              setAppointmentData(appointment.data);
              setFormVisible(true);
            }}
          />
        )}
      />
      <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        appointmentData={appointmentData}
        basicLayoutComponent={AppointmentFormComponent}
        dateEditorComponent={() => null}
        textEditorComponent={() => null}
        booleanEditorComponent={() => null}
        radioGroupComponent={() => null}
        labelComponent={() => null}
        commandLayoutComponent={(props) => (
          <CommandLayoutComponent
            appointmentData={appointmentData}
            {...props}
          />
        )}
        readOnly={!isValid(appointmentData)}
      />
      <DragDropProvider allowDrag={isValid} allowResize={() => false} />
      <CurrentTimeIndicator
        shadePreviousAppointments
        shadePreviousCells
        updateInterval={60000}
      />

      <ConfirmationDialog ignoreCancel />
    </Scheduler>
  );
};

export default Planner;
