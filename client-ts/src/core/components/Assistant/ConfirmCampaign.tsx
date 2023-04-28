import React, { useEffect, useState } from 'react';
import { ISuggestedPostsResponse } from '../../../api/assistant/types';
import { Box, TextField } from '@mui/material';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

interface Props {
  data: ISuggestedPostsResponse;
  onChange: (data: ISuggestedPostsResponse) => any;
}

const ConfirmCampaign = ({ data, onChange }: Props) => {
  const [changedData, setChangedData] = useState<ISuggestedPostsResponse>(data);

  const handlePostChange = (index: number, message: string) => {
    const newSuggestedPosts = [...changedData.suggested_posts];
    newSuggestedPosts[index] = {
      ...newSuggestedPosts[index],
      message,
    };
    const newData = {
      ...changedData,
      suggested_posts: newSuggestedPosts,
    };
    setChangedData(newData);
  };

  const handleDateChange = (index: number, newDate: Date) => {
    const newSuggestedPosts = [...changedData.suggested_posts];
    newSuggestedPosts[index] = {
      ...newSuggestedPosts[index],
      date: newDate,
    };
    const newData = {
      ...changedData,
      suggested_posts: newSuggestedPosts,
    };
    setChangedData(newData);
  };

  useEffect(() => {
    onChange(changedData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedData]);

  if (!data) {
    return null;
  }

  return (
    <>
      {changedData.suggested_posts.map((post, index) => {
        return (
          <Box sx={{ marginTop: '1rem' }} key={index}>
            <AppointmentForm.Label
              text={`Post #${index + 1}`}
              type="titleLabel"
              style={{ paddingTop: '1rem' }}
            />
            <TextField
              fullWidth
              value={post.message}
              multiline
              onChange={(e) => {
                handlePostChange(index, e.target.value);
              }}
            />
            <AppointmentForm.Label text={`Scheduled for`} type="titleLabel" />
            <AppointmentForm.DateEditor
              value={moment(post.date) as unknown as string}
              onValueChange={(nextValue) => handleDateChange(index, nextValue)}
            />
          </Box>
        );
      })}
    </>
  );
};

export default ConfirmCampaign;
