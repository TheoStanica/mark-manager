import { body } from 'express-validator';

export const scheduleFacebookPostValidation = [
  body('facebookUserId')
    .isNumeric()
    .notEmpty()
    .withMessage('Please provide a valid user ID'),
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
  body('pageId').isNumeric().notEmpty(),
];

export const updateScheduldFacebookPostValidation = [
  body('id')
    .notEmpty()
    .bail()
    .isString()
    .withMessage('Please provide a valid ID'),
  body('facebookUserId')
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage('Please provide a valid user ID')
    .optional(),
  body('pageId')
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage('Please provide a valid page ID')
    .optional(),
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

export const deleteScheduldFacebookPostValidation = [
  body('id')
    .notEmpty()
    .bail()
    .isString()
    .withMessage('Please provide a valid ID'),
];
