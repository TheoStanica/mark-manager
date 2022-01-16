import * as yup from 'yup';

export const accountInfoSchema = yup.object({
  name: yup.string('Enter a valid name').max(32, 'Name is too long').optional(),
  email: yup
    .string('Enter your email')
    .email('Email is not valid')
    .required('Email is required'),
  avatar: yup.mixed().test('fileSize', 'Image size is too big', (value) => {
    if (!value) return true; // attachment is optional
    return value.size <= 2097152; // 2MB
  }),
});
