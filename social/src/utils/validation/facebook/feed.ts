import { query } from 'express-validator';

export const feedValidation = [
  query('facebookUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Facebook user ID'),
  query('pageId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Page ID'),
  query('before').notEmpty().optional(),
  query('after').notEmpty().optional(),
];
