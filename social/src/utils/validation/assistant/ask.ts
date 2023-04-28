import { body } from 'express-validator';

export const askValidation = [
  body('message').notEmpty().isString().withMessage('Please provide a message'),
];
