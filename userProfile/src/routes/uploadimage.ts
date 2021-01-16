import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '@tcosmin/common';
import { AWSImageUploader } from '../services/aws-image-upload';

const router = express.Router();

router.post(
  '/api/user/uploadimage',
  requireAuth,
  AWSImageUploader.upload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError('No file provided');
    }

    // TODO figure out this
    //@ts-ignore
    res.send({ imageUrl: req.file.location });
  }
);

export { router as uploadImageRouter };
