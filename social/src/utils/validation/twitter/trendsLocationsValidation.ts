import { query } from 'express-validator';

export const trendsLicationsValidation = [
  query('twitterUserId')
    .isNumeric()
    .notEmpty()
    .withMessage('Please provide a valid Twitter user ID'),
  query('lat')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide valid coordinates'),
  query('long')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide valid coordinates'),
];
