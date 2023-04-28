import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import CountrySelect from './ContrySelect';

export interface ICampaignForm {
  topic?: string;
  numberOfPosts?: number;
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
}

interface Props {
  onChange: (value: ICampaignForm) => any;
}

const CampaignForm = ({ onChange }: Props) => {
  const [topic, setTopic] = React.useState<string | undefined>('');
  const [numberOfPosts, setNumberOfPosts] = React.useState<number | undefined>(
    undefined
  );
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [country, setCountry] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    onChange({ topic, numberOfPosts, startDate, endDate, timezone: country });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, numberOfPosts, startDate, endDate, country]);

  return (
    <>
      <AppointmentForm.Label
        text="Topic"
        type="titleLabel"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      />
      <TextField
        label="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        fullWidth
      />

      <AppointmentForm.Label
        text="Number of posts"
        type="titleLabel"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      />
      <Autocomplete
        options={['1', '2', '3', '4', '5']}
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="Number of posts" />
        )}
        onChange={(_, value) => {
          setNumberOfPosts(Number(value));
        }}
      />

      <AppointmentForm.Label
        text="Campaign start date"
        type="titleLabel"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      />
      <AppointmentForm.DateEditor
        onValueChange={(value) => setStartDate(value)}
      />

      <AppointmentForm.Label
        text="Campaign end date"
        type="titleLabel"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      />
      <AppointmentForm.DateEditor
        onValueChange={(value) => setEndDate(value)}
      />

      <AppointmentForm.Label
        text="Select country"
        type="titleLabel"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      />
      <CountrySelect onChange={(_country) => setCountry(_country)} />
    </>
  );
};

export default CampaignForm;
