import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';

const AppointmentComponent = ({
  children,
  style,
  isShaded,
  onClick,
  ...props
}) => {
  return (
    <Appointments.Appointment
      {...props}
      style={{
        ...style,
        borderRadius: 2,
        background: isShaded ? '#79bfd9' : '#068abc',
      }}
      onClick={onClick}
    >
      {children}
    </Appointments.Appointment>
  );
};

export default AppointmentComponent;
