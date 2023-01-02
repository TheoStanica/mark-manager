import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must have at least 8 characters')
    // .matches(/([A-Z])+/, 'Password must have at least one upper letter')
    // .matches(/[a-z]+/, 'Password must have at least one lower letter')
    // .matches(/\d+/, 'Password must have at least one digit')
    // .matches(/[@$!%*?&]+/, 'Password must have at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
