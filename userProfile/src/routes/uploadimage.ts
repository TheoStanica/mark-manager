import express, { Request, Response } from 'express';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { BadRequestError } from '@tcosmin/common';
import { AWSImageUploader } from '../services/aws-image-upload';

const router = express.Router();

router.post('/api/user/uploadimage', async (req: Request, res: Response) => {
  AWSImageUploader.uploadSingleFile(req, res);
});

export { router as uploadImageRouter };
