import { body } from 'express-validator';

export const changePasswordValidation = [
  body('currentPassword')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Current Password is not valid'),
  body('newPassword')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('New password must be between 4 and 20 characters'),
];
