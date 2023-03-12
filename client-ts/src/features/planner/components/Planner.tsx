import React, { useCallback, useMemo, useState } from 'react';
import {
  AppointmentModel,
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  AppointmentForm,
  Appointments,
  ConfirmationDialog,
  CurrentTimeIndicator,
  DateNavigator,
  DayView,
  DragDropProvider,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import MonthCell from './MonthCell';
import moment from 'moment';
import { useFetchTwitterPostsQuery } from '../../../api/twitterPlanner';
import useErrorSnack from '../../../core/hooks/useErrorSnack';
import AppointmentFormComp from './AppointmentFormComp';
import { useFetchConnectedAccountsQuery } from '../../../api/social';
import {
  isTwitterAccount,
  ITwitterAccountData,
} from '../../../api/social/types';
import { IConnectedAccount } from '../../../core/types/social';

const Planner = () => {
  const [currentView, setCurrentView] = useState('Month');
  const [appointmentData, setAppointmentData] = useState<
    AppointmentModel | undefined
  >(undefined);
  const [formVisible, setFormVisible] = useState(false);

  const { data: rawData, error } = useFetchTwitterPostsQuery();
  const { data: connectedAccounts } = useFetchConnectedAccountsQuery();
  useErrorSnack({ error });

  const postTitle = useCallback(
    (userId: string) => {
      const twitterAccount = connectedAccounts?.find(
        (account) =>
          isTwitterAccount(account) && account.data.twitterUserId === userId
      );

      return (
        (twitterAccount as IConnectedAccount<ITwitterAccountData>)?.data
          .twitterScreenName || userId
      );
    },
    [connectedAccounts]
  );

  const data: AppointmentModel[] = useMemo(() => {
    // return [];

    if (!rawData) {
      return [];
    }
    return rawData.tweets.map((post) => {
      return {
        title: postTitle(post.data.twitterUserId),
        startDate: moment(post.data.date).toDate(),
        endDate: moment(post.data.date).add(1, 's').toDate(),
        id: post._id,
        text: post.data.message,
        platform: post.data.platform,
        twitterUserId: post.data.twitterUserId,
      };
    });
  }, [rawData, postTitle]);

  const commitChanges = () => {};

  const isValid = (appointment: any) => {
    return appointment.startDate > new Date();
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
          <MonthCell
            onClick={(e: any) => {
              setAppointmentData({
                startDate: e.startDate,
                endDate: e.endDate,
              });
              setFormVisible(true);
            }}
            {...props}
          />
        )}
      />
      <WeekView />
      <DayView />
      <EditingState onCommitChanges={commitChanges} />
      <IntegratedEditing />

      <Appointments
        appointmentComponent={(props) => (
          <Appointments.Appointment
            {...props}
            onClick={(appointment) => {
              setAppointmentData(appointment.data);
              setFormVisible(true);
            }}
          ></Appointments.Appointment>
        )}
      />
      {/* <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        appointmentData={appointmentData}
        // basicLayoutComponent={AppointmentFormComponent}
        basicLayoutComponent={() => null}
        dateEditorComponent={() => null}
        textEditorComponent={() => null}
        booleanEditorComponent={() => null}
        radioGroupComponent={() => null}
        labelComponent={() => null}
        commandLayoutComponent={(props) =>
          // <CommandLayoutComponent
          //   appointmentData={appointmentData}
          //   {...props}
          // />
          null
        }
        readOnly={!isValid(appointmentData)}
      /> */}

      <DragDropProvider allowDrag={isValid} allowResize={() => false} />
      <CurrentTimeIndicator
        shadePreviousAppointments
        shadePreviousCells
        updateInterval={60000}
      />

      <ConfirmationDialog ignoreCancel />

      <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        appointmentData={appointmentData}
        dateEditorComponent={() => null}
        textEditorComponent={() => null}
        booleanEditorComponent={() => null}
        radioGroupComponent={() => null}
        labelComponent={() => null}
        basicLayoutComponent={(props) => <AppointmentFormComp {...props} />}
        readOnly={!isValid(appointmentData)}
      />
    </Scheduler>
  );
};

export default Planner;
