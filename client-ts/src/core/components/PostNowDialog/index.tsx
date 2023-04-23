import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
} from '@mui/material';
import { useCallback, useState } from 'react';

import SelectConnectedAccount, { Option } from '../SelectConnectedAccount';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useSnackbar } from 'notistack';
import { isFacebookAccount, isTwitterAccount } from '../../../api/social/types';
import { useTweetMessageMutation } from '../../../api/twitter';
import useErrorSnack from '../../hooks/useErrorSnack';
import { usePostMessageMutation } from '../../../api/facebook';

interface Props {
  open: boolean;
  onClose: () => any;
}

const PostNowDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<
    Array<Option> | undefined
  >(undefined);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const [tweetMessage, { error: tweetError }] = useTweetMessageMutation();
  const [postFacebookPost, { error: postFacebookError }] =
    usePostMessageMutation();

  useErrorSnack({ error: tweetError });
  useErrorSnack({ error: postFacebookError });

  const onSelectAccount = useCallback((accounts: Array<Option>) => {
    setSelectedOption(accounts || undefined);
  }, []);

  const onSubmit = useCallback(() => {
    selectedOption?.forEach(async (option) => {
      if (isTwitterAccount(option.account)) {
        if (!message) {
          return;
        }
        await tweetMessage({
          status: message,
          twitterUserId: option.account.data.twitterUserId,
        });
        enqueueSnackbar('Tweet created', { variant: 'success' });
      } else if (isFacebookAccount(option.account)) {
        if (!message) {
          return;
        }
        await postFacebookPost({
          message: message,
          facebookUserId: option.account.data.data.id,
          pageId: option.pageId!,
        });
        enqueueSnackbar('Post created', { variant: 'success' });
      }
    });
    setMessage(undefined);
    setSelectedOption(undefined);
    onClose();
  }, [
    selectedOption,
    message,
    enqueueSnackbar,
    onClose,
    tweetMessage,
    postFacebookPost,
  ]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Post something new</DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <AppointmentForm.Label
          text="Select accounts"
          type="titleLabel"
          style={{ paddingBottom: '0.5rem' }}
        />
        <SelectConnectedAccount onSelect={onSelectAccount} multiple />
        <AppointmentForm.Label
          text="Message"
          type="titleLabel"
          style={{ paddingTop: '1rem' }}
        />
        <TextField
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          minRows={5}
        />
      </DialogContent>
      <DialogActions>
        <Button aria-label="close dialog" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          aria-label="add stream"
          disabled={false}
          onClick={onSubmit}
        >
          Post Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostNowDialog;
