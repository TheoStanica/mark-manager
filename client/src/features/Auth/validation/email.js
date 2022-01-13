import * as yup from 'yup';

export const emailSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
});
