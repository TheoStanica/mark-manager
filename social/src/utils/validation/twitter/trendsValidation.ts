import { query } from 'express-validator';

export const trendsValidation = [
  query('twitterUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
  query('woeid')
    .isNumeric()
    .withMessage('Please provide a valid WOEID')
    .optional(),
];
