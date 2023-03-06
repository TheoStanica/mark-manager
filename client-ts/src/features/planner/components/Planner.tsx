import React, { useState } from 'react';
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

const Planner = () => {
  const [currentView, setCurrentView] = useState('Month');
  const [appointmentData, setAppointmentData] = useState<
    AppointmentModel | undefined
  >(undefined);
  const [formVisible, setFormVisible] = useState(false);

  const data: AppointmentModel[] = [
    {
      title: 'test',
      startDate: moment().add(1, 'day').toDate(),
      endDate: moment().add(1, 'day').add(1, 'minute').toDate(),
      id: 'sdgsdgsdg',
      userId: 'nowu',
      text: 'shiiiish',
    },
    {
      title: 'test2',
      startDate: moment().add(0, 'day').toDate(),
      endDate: moment().add(1, 'day').add(2, 'minute').toDate(),
      id: 'sdgsdgssssgadg',
      userId: 'nowu',
      text: 'shiiiish',
    },
  ];

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

      <Appointments />
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
      <AppointmentForm
        visible={formVisible}
        onVisibilityChange={(visible) => setFormVisible(visible)}
        // basicLayoutComponent={() => null}
        // dateEditorComponent={() => null}
        // textEditorComponent={() => null}
        // booleanEditorComponent={() => null}
        // radioGroupComponent={() => null}
        // labelComponent={() => null}
        // appointmentData={appointmentData}
        // readOnly={!isValid(appointmentData)}
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
