import { body } from 'express-validator';

export const planValidation = [
  body('topic').notEmpty().isString().withMessage('Please provide a message'),
  body('number_of_posts').notEmpty().isNumeric(),
  body('start_date').notEmpty().isString(),
  body('end_date').notEmpty().isString(),
  body('timezone').notEmpty().isString(),
];
