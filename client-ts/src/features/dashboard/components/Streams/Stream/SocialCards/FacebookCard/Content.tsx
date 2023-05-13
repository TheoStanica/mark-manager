import React from 'react';
import { useGetSummaryMutation } from '../../../../../../../api/ml';
import { Button, Card, CardContent, CircularProgress } from '@mui/material';

interface Props {
  message: string;
}
const Content = ({ message }: Props) => {
  const [getSummary, { isLoading, data }] = useGetSummaryMutation();

  return (
    <>
      <div>{message} </div>
      {isLoading ? (
        <CircularProgress size={20} /> // Replace with your spinner component
      ) : (
        message.length > 120 && (
          <Button
            variant="text"
            onClick={() => {
              getSummary({ message });
            }}
          >
            {data?.length ? '' : 'Summarize text'}
          </Button>
        )
      )}
      {data?.length && (
        <Card elevation={0}>
          <CardContent>{data[0]}</CardContent>
        </Card>
      )}
    </>
  );
};

export default Content;
