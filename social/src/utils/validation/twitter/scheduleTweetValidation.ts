import { body } from 'express-validator';

export const scheduleTweetValidation = [
  body('twitterUserId')
    .isNumeric()
    .notEmpty()
    .withMessage('Please provide a valid Twitter user ID'),
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
    }),
  body('text')
    .notEmpty()
    .withMessage('Please provide a tweet message')
    .optional(),
];
