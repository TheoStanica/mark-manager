import * as yup from 'yup';

export const appointmentValidation = yup.object({
  twitterUserId: yup.string().required('Account is required'),
  scheduledAt: yup.date('asas').required('Schedule date is required'),
  message: yup.string('asgasg').required(),
});
