import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import React from 'react';

interface Props extends AppointmentForm.CommandLayoutProps {
  appointmentData?: AppointmentModel;
}

const CommandLayoutComponent = ({
  appointmentData,
  readOnly,
  onCommitButtonClick,
  onCancelButtonClick,
  ...props
}: Props) => {
  return (
    <AppointmentForm.CommandLayout
      {...props}
      hideDeleteButton={readOnly || !appointmentData?.id}
      disableSaveButton={readOnly}
      onCommitButtonClick={() => {
        onCommitButtonClick();
        onCancelButtonClick();
      }}
      onCancelButtonClick={onCancelButtonClick}
    ></AppointmentForm.CommandLayout>
  );
};

export default CommandLayoutComponent;
