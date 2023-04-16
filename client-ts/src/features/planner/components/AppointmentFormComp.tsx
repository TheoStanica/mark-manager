import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { isTwitterAccount } from '../../../api/social/types';
import SelectConnectedAccount from '../../../core/components/SelectConnectedAccount';

const AppointmentFormComp = (props: AppointmentForm.BasicLayoutProps) => {
  return (
    <AppointmentForm.BasicLayout {...props} fullSize>
      <AppointmentForm.Label
        text="Select accounts"
        type="titleLabel"
        style={{ paddingBottom: '1rem' }}
      />
      <SelectConnectedAccount
        readOnly={props.readOnly}
        initialUsers={props.appointmentData.twitterUserId}
        onSelect={(acc) => {
          if (!acc[0]) {
            return;
          }
          if (isTwitterAccount(acc[0].account)) {
            props.onFieldChange({
              twitterUserId: acc[0].account.data.twitterUserId,
            });
          }
        }}
      />

      <AppointmentForm.Label
        text="Publish Date"
        type="titleLabel"
        style={{ paddingTop: '1rem' }}
      />
      <AppointmentForm.DateEditor
        value={moment(props.appointmentData.startDate) as unknown as string}
        onValueChange={(startDate) => {
          props.onFieldChange({ startDate });
        }}
        readOnly={props.readOnly}
      />

      <AppointmentForm.Label
        text="Message"
        type="titleLabel"
        style={{ paddingBottom: '1rem' }}
      />
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
