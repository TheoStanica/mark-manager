import { query } from 'express-validator';

export const verifyCredentialsValidation = [
  query('twitterUserId')
    .isNumeric()
    .notEmpty()
    .withMessage('Please provide a valid Twitter user ID'),
];
