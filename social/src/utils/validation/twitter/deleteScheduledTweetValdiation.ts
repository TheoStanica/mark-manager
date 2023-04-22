import { query } from 'express-validator';

export const deleteScheduledTweetValidation = [
  query('twitterUserId')
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
];
