import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '@tcosmin/common';
import { uploadImage } from '../utils/middlewares/uploadFile';

const router = express.Router();

router.post(
  '/uploadimage',
  requireAuth,
  uploadImage,
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError('No file provided');
    }

    //@ts-ignore
    res.send({ imageUrl: req.file.location });
  }
);

export { router as uploadImageRouter };
