import * as yup from 'yup';

export const changePasswordSchema = yup.object({
  newPassword: yup
    .string('Enter your new password')
    .min(8, 'Password must have at least 8 characters')
    // .matches(/([A-Z])+/, 'Password must have at least one upper letter')
    // .matches(/[a-z]+/, 'Password must have at least one lower letter')
    // .matches(/\d+/, 'Password must have at least one digit')
    // .matches(/[@$!%*?&]+/, 'Password must have at least one special character')
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  currentPassword: yup
    .string('Enter your current password')
    .min(8, 'Password must have at least 8 characters')
    // .matches(/([A-Z])+/, 'Password must have at least one upper letter')
    // .matches(/[a-z]+/, 'Password must have at least one lower letter')
    // .matches(/\d+/, 'Password must have at least one digit')
    // .matches(/[@$!%*?&]+/, 'Password must have at least one special character')
    .required('Current password is required'),
});
