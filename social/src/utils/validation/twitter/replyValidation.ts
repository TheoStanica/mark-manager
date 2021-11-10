import { query } from 'express-validator';

export const replyValidation = [
  query('repliesToScreenName')
    .notEmpty()
    .withMessage('Please provide a Twitter Screen Name'),
  query('inReplyToStatusId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid ID'),
  query('twitterUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Twitter user ID'),
  query('sinceId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid ID'),
  query('maxId')
    .optional()
    .isNumeric()
    .withMessage('maxId must be a numeric value'),
];
