import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { isTwitterAccount } from '../../../api/social/types';
import SelectConnectedAccount from '../../../core/components/SelectConnectedAccount';

const AppointmentFormComp = (props: AppointmentForm.BasicLayoutProps) => {
  return (
    <AppointmentForm.BasicLayout {...props}>
      {JSON.stringify(props.appointmentData)}

      <AppointmentForm.Label text="Select accounts" type="titleLabel" />
      <SelectConnectedAccount
        readOnly={props.readOnly}
        initialUsers={props.appointmentData.twitterUserId}
        onSelect={(acc) => {
          if (!acc[0]) {
            return;
          }
          if (isTwitterAccount(acc[0])) {
            props.onFieldChange({ twitterUserId: acc[0].data.twitterUserId });
          }
        }}
      />

      <AppointmentForm.Label text="Publish Date" type="titleLabel" />
      <AppointmentForm.DateEditor
        value={props.appointmentData.startDate?.toString()}
        onValueChange={(startDate) => {
          props.onFieldChange({ startDate });
        }}
        readOnly={props.readOnly}
      />

      <AppointmentForm.Label text="Message" type="titleLabel" />
      <AppointmentForm.TextEditor
        placeholder=""
        type="multilineTextEditor"
        value={props.appointmentData.text}
        onValueChange={(text) => {
          props.onFieldChange({ text });
        }}
        readOnly={!!props.readOnly}
      />
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormComp;
