import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import React, { useMemo } from 'react';
import { useFetchConnectedAccountsQuery } from '../../../api/social';
import { isTwitterAccount } from '../../../api/social/types';
import SelectConnectedAccount from '../../../core/components/SelectConnectedAccount';

const AppointmentFormComp = (props: AppointmentForm.BasicLayoutProps) => {
  const { data } = useFetchConnectedAccountsQuery();

  const connectedAccountValue = useMemo(() => {
    if (!data || data.length <= 0) {
      return undefined;
    }
    let value = undefined;
    data.forEach((acc) => {
      if (isTwitterAccount(acc)) {
        if (acc.data.twitterUserId === props.appointmentData.twitterUserId) {
          value = {
            label: acc.data.twitterScreenName,
            account: acc,
          };
        }
      }
    });
    return value;
  }, [data, props.appointmentData]);

  return (
    <AppointmentForm.BasicLayout {...props}>
      {JSON.stringify(props.appointmentData)}

      <AppointmentForm.Label text="Select accounts" type="titleLabel" />
      <SelectConnectedAccount
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

// const options: Array<Option> = useMemo(() => {
//   if (!data || data.length <= 0) {
//     return [];
//   }
//   return data.map((acc) => {
//     let label = 'unknown';
//     if (isTwitterAccount(acc)) {
//       label = acc.data.twitterScreenName;
//     }
//     return { label, account: acc };
//   });
// }, [data]);
