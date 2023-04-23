import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { isFacebookAccount, isTwitterAccount } from '../../../api/social/types';
import SelectConnectedAccount, {
  DefaultOption,
} from '../../../core/components/SelectConnectedAccount';
import { useMemo } from 'react';

const AppointmentFormComp = (props: AppointmentForm.BasicLayoutProps) => {
  const defaultValue: DefaultOption | undefined = useMemo(() => {
    const data = props.appointmentData;
    if (!data) {
      return undefined;
    }
    if (data.platform === 'twitter') {
      return {
        data: {
          twitterUserId: data.twitterUserId,
        },
      };
    } else if (data.platform === 'facebook') {
      return {
        data: {
          facebookUserId: data.facebookUserId,
          pageId: data.pageId,
        },
      };
    }

    return undefined;
  }, [props.appointmentData]);

  return (
    <AppointmentForm.BasicLayout {...props} fullSize>
      <AppointmentForm.Label
        text="Select accounts"
        type="titleLabel"
        style={{ paddingBottom: '1rem' }}
      />
      <SelectConnectedAccount
        readOnly={props.readOnly}
        defaultValue={defaultValue}
        onSelect={(acc) => {
          if (!acc[0]) {
            return;
          }
          if (isTwitterAccount(acc[0].account)) {
            props.onFieldChange({
              twitterUserId: acc[0].account.data.twitterUserId,
            });
          }
          if (isFacebookAccount(acc[0].account)) {
            props.onFieldChange({
              facebookUserId: acc[0].account.data.data.id,
              pageId: acc[0].pageId,
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
