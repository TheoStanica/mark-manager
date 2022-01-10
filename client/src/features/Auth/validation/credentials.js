import * as yup from 'yup';

export const credentialsSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must have at least 8 characters')
    // .matches(/([A-Z])+/, 'Password must have at least one upper letter')
    // .matches(/[a-z]+/, 'Password must have at least one lower letter')
    // .matches(/\d+/, 'Password must have at least one digit')
    // .matches(/[@$!%*?&]+/, 'Password must have at least one special character')
    .required('Password is required'),
});
