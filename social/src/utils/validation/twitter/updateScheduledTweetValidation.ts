import { body } from 'express-validator';

export const updateScheduldTweetValidation = [
  body('twitterUserId')
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
  body('scheduledTweetId')
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage('Please provide a valid Tweet ID'),
  body('scheduleAt')
    .notEmpty()
    .withMessage('Please provide a date to schedule this tweet')
    .bail()
    .isISO8601()
    .withMessage('Please provide a valid date date (ISO 8601)')
    .bail()
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('You must schedule a tweet in the future');
      }
      return true;
    })
    .optional(),
  body('text')
    .notEmpty()
    .withMessage('Please provide a tweet message')
    .optional(),
];
