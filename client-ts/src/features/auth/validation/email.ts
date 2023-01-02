import * as yup from 'yup';

export const emailSchema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
});
