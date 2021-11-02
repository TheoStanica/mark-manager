import { body } from 'express-validator';

export const tokenRefreshValidation = [
  body('refreshToken')
    .notEmpty()
    .bail()
    .isJWT()
    .withMessage('Refresh token must be a valid JWT'),
];
