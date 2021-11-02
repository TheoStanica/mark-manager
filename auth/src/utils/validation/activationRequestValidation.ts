import { body } from 'express-validator';

export const activationRequestValidation = [
  body('userId')
    .isLength({ max: 24, min: 24 })
    .withMessage('UserID is not valid')
    .isHexadecimal()
    .withMessage('UserID is not valid'),
];
