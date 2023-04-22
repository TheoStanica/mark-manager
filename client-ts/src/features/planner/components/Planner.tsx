import React, { useCallback, useMemo, useState } from 'react';
import {
  AppointmentModel,
  ChangeSet,
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
import {
  useDeleteTwitterPostMutation,
  useFetchTwitterPostsQuery,
  useScheduleTwitterPostMutation,
  useUpdateTwitterPostMutation,
} from '../../../api/twitterPlanner';
import useErrorSnack from '../../../core/hooks/useErrorSnack';
import AppointmentFormComp from './AppointmentFormComp';
import { useFetchConnectedAccountsQuery } from '../../../api/social';
import {
  IFacebookAccountData,
  isFacebookAccount,
  isTwitterAccount,
  ITwitterAccountData,
} from '../../../api/social/types';
import { IConnectedAccount } from '../../../core/types/social';
import CommandLayoutComponent from './CommandLayoutComp';
import {
  useFetchFacebookPostsQuery,
  useScheduleFacebookPostMutation,
  useUpdateFacebookPostMutation,
  useDeleteFacebookPostMutation,
} from '../../../api/facebookPlanner';

const Planner = () => {
  const [currentView, setCurrentView] = useState('Month');
  const [appointmentData, setAppointmentData] = useState<
    AppointmentModel | undefined
  >(undefined);
  const [formVisible, setFormVisible] = useState(false);

  const { data: rawData, error } = useFetchTwitterPostsQuery();
  const { data: rawFbData, error: fbError } = useFetchFacebookPostsQuery();
  const { data: connectedAccounts } = useFetchConnectedAccountsQuery();
  const [schedulePost, { error: createError }] =
    useScheduleTwitterPostMutation();
  const [updatePost, { error: updateError }] = useUpdateTwitterPostMutation();
  const [deletePost, { error: deleteError }] = useDeleteTwitterPostMutation();
  const [scheduleFbPost, { error: createFbError }] =
    useScheduleFacebookPostMutation();
  const [updateFbPost, { error: updateFbError }] =
    useUpdateFacebookPostMutation();
  const [deleteFbPost, { error: deleteFbError }] =
    useDeleteFacebookPostMutation();

  useErrorSnack({ error });
  useErrorSnack({ error: createError });
  useErrorSnack({ error: updateError });
  useErrorSnack({ error: deleteError });
  useErrorSnack({ error: fbError });
  useErrorSnack({ error: createFbError });
  useErrorSnack({ error: updateFbError });
  useErrorSnack({ error: deleteFbError });

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

  const fbPostTitle = useCallback(
    (facebookId: string, pageId: string) => {
      const fbAccount = connectedAccounts?.find(
        (account) =>
          isFacebookAccount(account) && account.data.data.id === facebookId
      );

      return (
        'Facebook:' +
          (
            fbAccount as IConnectedAccount<IFacebookAccountData>
          )?.data.pages.find((page) => page.id === pageId)?.name || pageId
      );
    },
    [connectedAccounts]
  );

  const data: AppointmentModel[] = useMemo(() => {
    if (!rawData && !rawFbData) {
      return [];
    }
    const twitterPosts =
      rawData?.tweets.map((post) => {
        return {
          title: postTitle(post.data.twitterUserId),
          startDate: moment(post.data.date).toDate(),
          endDate: moment(post.data.date).add(1, 's').toDate(),
          id: post._id,
          text: post.data.message,
          platform: post.data.platform,
          twitterUserId: post.data.twitterUserId,
        };
      }) || [];

    const facebookPosts =
      rawFbData?.posts.map((post) => {
        return {
          title: fbPostTitle(post.data.facebookUserId, post.data.pageId),
          startDate: moment(post.data.date).toDate(),
          endDate: moment(post.data.date).add(1, 's').toDate(),
          id: post._id,
          text: post.data.message,
          platform: post.data.platform,
          facebookUserId: post.data.facebookUserId,
          pageId: post.data.pageId,
        };
      }) || [];

    return [...twitterPosts, ...facebookPosts];
  }, [rawData, postTitle, rawFbData, fbPostTitle]);

  const add = useCallback(
    (data: { [key: string]: any }) => {
      if (data.twitterUserId) {
        schedulePost({
          scheduleAt: data.startDate || appointmentData?.startDate,
          text: data.text,
          twitterUserId: data.twitterUserId,
        });
      } else {
        scheduleFbPost({
          scheduleAt: data.startDate || appointmentData?.startDate,
          text: data.text,
          facebookUserId: data.facebookUserId,
          pageId: data.pageId,
        });
      }
    },
    [appointmentData, schedulePost, scheduleFbPost]
  );

  const update = useCallback(
    (id: string, data: { [key: string]: any }) => {
      if (appointmentData!.platform! === 'twitter') {
        updatePost({
          id,
          twitterUserId: data.twitterUserId,
          scheduleAt: data.startDate,
          text: data.text,
        });
      } else {
        updateFbPost({
          id,
          text: data.text,
          scheduleAt: data.startDate,
          facebookUserId: data.facebookUserId,
          pageId: data.pageId,
        });
      }
    },
    [appointmentData, updatePost, updateFbPost]
  );

  const deleteScheduledPost = useCallback(
    (id: string) => {
      if (appointmentData!.platform! === 'twitter') {
        deletePost({ id });
      } else {
        deleteFbPost({ id });
      }
    },
    [appointmentData, deletePost, deleteFbPost]
  );

  const commitChanges = useCallback(
    (changes: ChangeSet) => {
      const { changed, deleted } = changes;

      if (deleted) {
        deleteScheduledPost(String(deleted));
        return;
      }
      if (!changed) {
        return;
      }

      const id = Object.keys(changed)[0];

      if (id === 'undefined') {
        add(changed[id]);
        return;
      }
      // add support for drag & drop
      update(id, changed[id]);
    },
    [add, update, deleteScheduledPost]
  );

  const isValid = useCallback((appointment: any) => {
    if (!appointment) {
      return false;
    }
    return appointment.startDate > new Date();
  }, []);

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
      <EditingState
        editingAppointment={appointmentData}
        onCommitChanges={commitChanges}
      />
      <IntegratedEditing />

      <Appointments
        appointmentComponent={(props) => (
          <Appointments.Appointment
            {...props}
            // drag drop disabled for now
            draggable={false}
            onClick={(appointment) => {
              setAppointmentData(appointment.data);
              setFormVisible(true);
            }}
          ></Appointments.Appointment>
        )}
      />

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
        commandLayoutComponent={(props) => (
          <CommandLayoutComponent
            {...props}
            appointmentData={appointmentData}
          />
        )}
        readOnly={!isValid(appointmentData)}
      />
    </Scheduler>
  );
};

export default Planner;
