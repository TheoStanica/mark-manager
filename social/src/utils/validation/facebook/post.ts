import { body } from 'express-validator';

export const postfeedValidation = [
  body('facebookUserId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Facebook user ID'),
  body('pageId')
    .notEmpty()
    .isNumeric()
    .withMessage('Please provide a valid Page ID'),
  body('message').notEmpty().isString(),
];
