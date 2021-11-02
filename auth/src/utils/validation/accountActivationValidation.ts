import { param } from 'express-validator';

export const accountActivationValidation = [
  param('activationToken')
    .notEmpty()
    .bail()
    .matches(/(^[A-Fa-f0-9]{40,40}$)/)
    .withMessage('Invalid activation token'),
];
