import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import CampaignForm, { ICampaignForm } from './CampaignForm';
import SelectConnectedAccount, { Option } from '../SelectConnectedAccount';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { useSuggestPostsMutation } from '../../../api/assistant';
import useErrorSnack from '../../hooks/useErrorSnack';
import ConfirmCampaign from './ConfirmCampaign';
import { ISuggestedPostsResponse } from '../../../api/assistant/types';
import { useScheduleTwitterPostMutation } from '../../../api/twitterPlanner';
import { useScheduleFacebookPostMutation } from '../../../api/facebookPlanner';
import { useSnackbar } from 'notistack';
import {
  IFacebookAccountData,
  ITwitterAccountData,
  isFacebookAccount,
  isTwitterAccount,
} from '../../../api/social/types';
import { IConnectedAccount } from '../../types/social';

interface Props {
  open: boolean;
  onClose: () => any;
}

const steps = ['Campaign Details', 'Accounts', 'Confirm'];

const AssistantPostsDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [campaign, setCampaign] = useState<ICampaignForm>({});
  const [accounts, setAccounts] = useState<Array<Option>>([]);
  const [finalSuggestions, setFinalSuggestions] = useState<
    ISuggestedPostsResponse | undefined
  >();

  const [suggestPosts, { data, isLoading, error }] = useSuggestPostsMutation();
  const [scheduleTweet] = useScheduleTwitterPostMutation();
  const [scheduleFacebookPost] = useScheduleFacebookPostMutation();

  const { enqueueSnackbar } = useSnackbar();

  useErrorSnack({ error });

  const isNextDisabled = useMemo(() => {
    if (isLoading) {
      return true;
    }
    if (activeStep === 0) {
      if (
        !campaign.topic ||
        campaign.topic.length === 0 ||
        !campaign.numberOfPosts ||
        !campaign.startDate ||
        !campaign.endDate ||
        !campaign.timezone
      ) {
        return true;
      }
      if (campaign.startDate >= campaign.endDate) {
        return true;
      }
      if (campaign.startDate < new Date()) {
        return true;
      }
      return false;
    }
    if (activeStep === 1) {
      if (accounts.length === 0) {
        return true;
      }
    }
    if (activeStep === 2) {
      if (!finalSuggestions) {
        return true;
      }
    }
    return false;
  }, [activeStep, campaign, accounts, isLoading, finalSuggestions]);

  const schedulePosts = useCallback(async () => {
    accounts.forEach((accountOption) => {
      if (isTwitterAccount(accountOption.account)) {
        finalSuggestions?.suggested_posts.forEach((post) => {
          scheduleTweet({
            scheduleAt: post.date,
            text: post.message,
            twitterUserId: (
              accountOption.account as IConnectedAccount<ITwitterAccountData>
            ).data.twitterUserId,
          });
        });
      }
      if (isFacebookAccount(accountOption.account)) {
        finalSuggestions?.suggested_posts.forEach((post) => {
          scheduleFacebookPost({
            scheduleAt: post.date,
            text: post.message,
            facebookUserId: (
              accountOption.account as IConnectedAccount<IFacebookAccountData>
            ).data.data.id,
            pageId: accountOption.pageId!,
          });
        });
      }
    });
    enqueueSnackbar('Campaign created', { variant: 'success' });
  }, [
    accounts,
    finalSuggestions,
    enqueueSnackbar,
    scheduleFacebookPost,
    scheduleTweet,
  ]);

  const handleNext = async () => {
    if (activeStep === 1) {
      // generate campaign
      await suggestPosts({
        topic: campaign.topic!,
        number_of_posts: campaign.numberOfPosts!,
        start_date: campaign.startDate?.toString()!,
        end_date: campaign.endDate?.toString()!,
        timezone: campaign.timezone!,
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }

    if (activeStep === steps.length - 1) {
      // schedule posts...
      schedulePosts();
      handleClose();
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setAccounts([]);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        Campaign Assistant
      </DialogTitle>
      <DialogContent sx={{ pt: `${theme.spacing(1)} !important` }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length - 1 && (
          <>
            <Typography
              variant="h5"
              sx={{ textAlign: 'center', marginTop: '2rem' }}
            >
              Here's your brand new campaign
            </Typography>
            {data && (
              <ConfirmCampaign
                onChange={(s) => setFinalSuggestions(s)}
                data={data}
              />
            )}
          </>
        )}
        {activeStep === 0 && (
          <CampaignForm onChange={(form) => setCampaign(form)} />
        )}
        {activeStep === 1 && !isLoading && (
          <Box sx={{ paddingTop: '1rem' }}>
            <AppointmentForm.Label
              text="Select social media accounts"
              type="titleLabel"
              style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
            />
            <SelectConnectedAccount
              multiple
              onSelect={(accounts) => setAccounts(accounts)}
            />
          </Box>
        )}
        {activeStep === 1 && isLoading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <CircularProgress size={30} />

            <Typography variant="body1">Generating your campaign...</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          {activeStep === 0 && 'Next'}
          {activeStep === 1 && 'Generate Campaign'}
          {activeStep === steps.length - 1 && 'Finish Campaign'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssistantPostsDialog;
