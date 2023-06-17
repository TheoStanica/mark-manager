import { query } from 'express-validator';

export const searchValidation = [
  query('twitterUserId')
    .notEmpty()
    .isString()
    .withMessage('Please provide a valid Twitter user ID'),
  query('search').notEmpty().withMessage('Please provide a search parameter'),
  query('maxId')
    .optional()
    .isString()
    .withMessage('maxId must be a numeric value'),
];
