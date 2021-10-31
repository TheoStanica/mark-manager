import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '@tcosmin/common';
import { imageUploadService } from '../services/imageUploadService';

const router = express.Router();

router.post(
  '/api/user/uploadimage',
  requireAuth,
  imageUploadService.upload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError('No file provided');
    }

    //@ts-ignore
    res.send({ imageUrl: req.file.location });
  }
);

export { router as uploadImageRouter };
