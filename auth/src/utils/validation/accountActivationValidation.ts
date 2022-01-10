import { body } from 'express-validator';

export const accountActivationValidation = [
  body('activationToken')
    .notEmpty()
    .bail()
    .matches(/(^[A-Fa-f0-9]{40}$)/)
    .withMessage('Invalid activation token'),
];
