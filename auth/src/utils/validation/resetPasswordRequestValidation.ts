import { body } from 'express-validator';

export const resetPasswordRequestValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
];
