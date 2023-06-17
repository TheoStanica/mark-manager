import { query } from 'express-validator';

export const homeTimelineValidation = [
  query('maxId')
    .optional()
    .isString()
    .withMessage('maxId must be a numericvalue'),
  query('twitterUserId')
    .notEmpty()
    .isString()
    .withMessage('Please provide a valid Twitter user ID'),
];
