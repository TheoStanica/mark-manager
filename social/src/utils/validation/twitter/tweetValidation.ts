import { body } from 'express-validator';

export const tweetValidation = [
  body('status').not().isEmpty().withMessage('Please provide a status'),
  body('twitterUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
  body('inReplyToStatusId')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid inReplyToStatusId'),
];
