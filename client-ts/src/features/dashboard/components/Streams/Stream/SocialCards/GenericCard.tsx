import { Avatar, Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { Theme } from '@mui/system';
import React, { ReactNode } from 'react';
import { StyleSheet } from '../../../../../../core/types/stylesheet';

interface Props {
  beforeHeader?: ReactNode;
  title: string | ReactNode;
  subheader?: string;
  avatarSrc?: string;
  content: ReactNode;
}
const GenericCard = ({
  beforeHeader,
  title,
  subheader,
  avatarSrc,
  content,
}: Props) => {
  const theme = useTheme();

  return (
    <Card sx={styles(theme).card}>
      {beforeHeader ? (
        <CardContent sx={styles(theme).aboveHeader}>{beforeHeader}</CardContent>
      ) : null}
      <CardHeader
        sx={styles(theme).header}
        avatar={
          <Avatar sx={{ bgcolor: 'lightgray' }} src={avatarSrc}>
            A
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      <CardContent sx={styles(theme).content}>{content}</CardContent>
      {/* <CardActions>
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

const styles = (theme: Theme): StyleSheet => ({
  card: {
    borderRadius: 0,
    marginBottom: theme.spacing(2),
  },
  aboveHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0),
  },
  header: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(0),
  },
});

export default GenericCard;
