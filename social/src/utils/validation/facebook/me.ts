import { query } from 'express-validator';

export const meValidation = [
  query('facebookUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Facebook user ID'),
];
