import React from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import ConnectedAccountsDropdown from '../ConnectedAccountsDropdown/ConnectedAccountsDropdown';
import { useSelector } from 'react-redux';
import MockedTwitterCard from '../Tweet/MockTweet';

const AppointmentFormComponent = ({
  appointmentData,
  onFieldChange,
  readOnly,
  ...props
}) => {
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );

  const findAppointmentTwitterAccount = () => {
    let account = undefined;
    twitterAccounts.forEach((acc) => {
      if (
        twitterAccountsById[acc].twitterUserId === appointmentData.userId &&
        twitterAccountsById[acc].hasAdsAccount
      )
        account = twitterAccountsById[acc];
    });
    return account;
  };
  const appointmentAccount = findAppointmentTwitterAccount();

  const getAdsAccounts = () => {
    const adsAccounts = [];
    twitterAccounts.forEach((acc) => {
      if (twitterAccountsById[acc].hasAdsAccount) {
        adsAccounts.push(twitterAccountsById[acc]);
      }
    });
    return adsAccounts;
  };

  return (
    <AppointmentForm.BasicLayout
      {...props}
      appointmentData={appointmentData}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      readOnly={readOnly}
    >
      <>
        <AppointmentForm.Label text="Media Account" type="title" />
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <ConnectedAccountsDropdown
            onSelected={(userId) => {
              onFieldChange({ userId });
            }}
            options={getAdsAccounts()}
            initialValue={[appointmentAccount]}
            isDisabled={readOnly}
          />
        </div>

        <AppointmentForm.Label text="Scheduled Date" type="title" />
        <AppointmentForm.DateEditor
          value={appointmentData.startDate}
          onValueChange={(startDate) => {
            onFieldChange({ startDate });
          }}
          readOnly={readOnly}
        />

        <AppointmentForm.Label text="Tweet" type="title" />
        <AppointmentForm.TextEditor
          type="multilineTextEditor"
          value={appointmentData.text}
          onValueChange={(text) => {
            onFieldChange({ text });
          }}
          readOnly={readOnly}
        />

        {appointmentData.userId && (
          <div style={{ marginTop: 20 }}>
            <MockedTwitterCard
              text={appointmentData.text || ''}
              twitterUserId={appointmentData.userId}
            />
          </div>
        )}
      </>
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormComponent;
