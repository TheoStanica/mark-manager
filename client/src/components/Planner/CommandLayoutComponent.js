import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';

const CommandLayoutComponent = ({
  appointmentData,
  readOnly,
  onCommitButtonClick,
  onCancelButtonClick,
  ...props
}) => {
  const isExpired = () => {
    return appointmentData.startDate < new Date();
  };

  return (
    <AppointmentForm.CommandLayout
      {...props}
      hideDeleteButton={readOnly || !appointmentData.userId}
      disableSaveButton={isExpired()}
      onCommitButtonClick={(e) => {
        onCommitButtonClick();
        onCancelButtonClick();
      }}
      onCancelButtonClick={onCancelButtonClick}
    ></AppointmentForm.CommandLayout>
  );
};

export default CommandLayoutComponent;
