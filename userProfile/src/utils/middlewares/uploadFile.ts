import { BadRequestError, InternalServerError } from '@tcosmin/common';
import { Request, Response } from 'express';
import multer from 'multer';
import { imageUploadService } from '../../services/imageUploadService';

export const uploadImage = (req: Request, res: Response, next: Function) => {
  const upload = imageUploadService.upload.single('image');

  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      next(new BadRequestError(error.message));
    } else if (error) {
      next(new InternalServerError());
    }
    next();
  });
};
