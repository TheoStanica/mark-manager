import { body } from 'express-validator';

export const streamPreferenceValidation = [
  body('stream_preferences')
    .exists()
    .withMessage('stream_preferences is required.'),
];
