import { body, oneOf } from 'express-validator';

export const updateUserValidation = [
  body('fullName').isLength({ min: 4, max: 30 }).optional(),
  body('profilePicture').isURL().optional(),
  body('email').isEmail().optional(),
  oneOf([
    body('themePreference').equals('light').optional(),
    body('themePreference').equals('dark').optional(),
  ]),
];
