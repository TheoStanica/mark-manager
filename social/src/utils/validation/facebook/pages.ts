import { body } from 'express-validator';

export const addPageValidation = [
  body('facebookUserId').notEmpty().isNumeric(),
  body('access_token').notEmpty().isString(),
  body('category').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('id').notEmpty().isNumeric(),
];
