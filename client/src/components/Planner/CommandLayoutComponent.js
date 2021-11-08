import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';

const CommandLayoutComponent = ({ appointmentData, readOnly, ...props }) => {
  const isExpired = () => {
    return appointmentData.startDate < new Date();
  };

  return (
    <AppointmentForm.CommandLayout
      {...props}
      hideDeleteButton={readOnly || !appointmentData.userId}
      disableSaveButton={isExpired()}
    ></AppointmentForm.CommandLayout>
  );
};

export default CommandLayoutComponent;
