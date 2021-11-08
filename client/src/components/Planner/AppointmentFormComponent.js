import React, { useState } from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import ConnectedAccountsDropdown from '../ConnectedAccountsDropdown/ConnectedAccountsDropdown';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { appointmentValidation } from './validation/appointmentValidation';
import MockedTwitterCard from '../Tweet/MockTweet';

const AppointmentFormComponent = ({ appointmentData, ...props }) => {
  const { userId } = appointmentData;
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );
  const [readOnly] = useState(appointmentData.startDate < new Date());

  const findAppointmentTwitterAccount = () => {
    let account = undefined;
    twitterAccounts.forEach((acc) => {
      if (twitterAccountsById[acc].twitterUserId === userId)
        account = twitterAccountsById[acc];
    });
    return account;
  };
  const appointmentAccount = findAppointmentTwitterAccount();

  const isFieldValid = (touched, errors, field) => {
    return errors[field] && touched[field];
  };

  const fieldStyle = (touched, errors, field) => {
    return {
      color: isFieldValid(touched, errors, field) ? 'red' : 'black',
    };
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Formik
        validationSchema={appointmentValidation}
        initialValues={{
          twitterUserId: appointmentData.userId,
          message: appointmentData.text || '',
          scheduledAt: appointmentData.startDate,
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, errors, setFieldValue, handleSubmit, touched }) => (
          <>
            <AppointmentForm.Label
              text="Media Account"
              type="title"
              style={fieldStyle(touched, errors, 'twitterUserId')}
            />
            <div style={{ marginTop: 16, marginBottom: 16 }}>
              <ConnectedAccountsDropdown
                onSelected={(id) => setFieldValue('twitterUserId', id)}
                initialValue={[appointmentAccount]}
                isDisabled={readOnly}
              />
            </div>

            <AppointmentForm.Label
              text="Scheduled Date"
              type="title"
              style={fieldStyle(touched, errors, 'scheduledAt')}
            />
            <AppointmentForm.DateEditor
              id="standard_basic"
              value={values.scheduledAt}
              onValueChange={(date) => setFieldValue('scheduledAt', date)}
              style={{ background: 'white' }}
              readOnly={readOnly}
            />

            <AppointmentForm.Label
              text="Tweet"
              type="title"
              style={fieldStyle(touched, errors, 'message')}
            />
            <AppointmentForm.TextEditor
              type="multilineTextEditor"
              value={values.message}
              onValueChange={(msg) => setFieldValue('message', msg)}
              style={{ outlineColor: 'red' }}
              readOnly={readOnly}
            />
            <button onClick={() => handleSubmit()}>submit</button>

            {values.twitterUserId && (
              <div style={{ marginTop: 20 }}>
                <MockedTwitterCard
                  text={values.message}
                  twitterUserId={values.twitterUserId}
                />
              </div>
            )}
          </>
        )}
      </Formik>
    </AppointmentForm.BasicLayout>
  );
};

export default AppointmentFormComponent;
