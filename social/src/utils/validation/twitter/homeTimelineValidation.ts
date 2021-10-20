import { query } from 'express-validator';

export const homeTimelineValidation = [
  query('maxId')
    .optional()
    .isNumeric()
    .withMessage('maxId must be a numericvalue'),
  query('twitterUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
];
