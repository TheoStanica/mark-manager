import { BadRequestError } from '@tcosmin/common';
import 'express-async-errors';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

class ImageUploadService {
  private s3: aws.S3;
  public upload;

  constructor() {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: 'eu-west-3',
    });
    this.s3 = new aws.S3();

    const fileFilter = (req: any, file: any, cb: any) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(
          new BadRequestError(
            'Invalid file type. Please upload only JPEG or PNG'
          ),
          false
        );
      }
    };

    this.upload = multer({
      limits: {
        fileSize: 2097152, //2MB
      },
      fileFilter,
      storage: multerS3({
        s3: this.s3,
        bucket: 'projectmarkbucket',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, Date.now().toString());
        },
      }),
    });
  }
}

export const imageUploadService = new ImageUploadService();
