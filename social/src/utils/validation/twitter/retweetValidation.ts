import { body } from 'express-validator';

export const retweetValidation = [
  body('tweetId')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Please provide a Tweet ID'),
  body('twitterUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
];
