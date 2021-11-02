import { body } from 'express-validator';

export const userCredentialsValidation = [
  body('email').notEmpty().isEmail().withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];
