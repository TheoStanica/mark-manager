import { body } from 'express-validator';

export const meValidation = [
  body('facebookUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Facebook user ID'),
];
