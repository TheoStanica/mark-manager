import { requireAuth, validateRequest } from '@tcosmin/common';
import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import { TwitterService } from '../../../services/twitterService';
import { TrendsDto } from '../../../utils/dtos/twitter/trendsDto';
import { trendsValidation } from '../../../utils/validation/twitter/trendsValidation';
import { TrendsLocationsDto } from '../../../utils/dtos/twitter/trendsLocationsDto';
import { trendsLicationsValidation } from '../../../utils/validation/twitter/trendsLocationsValidation';

const router = express.Router();

router.get(
  '/trends/place',
  requireAuth,
  trendsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const trendsDto = (req.query as unknown) as TrendsDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const trends = await twitterService.trends(userId, trendsDto);

    res.send(trends);
  }
);

router.get(
  '/trends/closest',
  requireAuth,
  trendsLicationsValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const trendsLocationsDto = (req.query as unknown) as TrendsLocationsDto;
    const userId = req.currentUser!.userId;
    const twitterService = Container.get(TwitterService);

    const trends = await twitterService.getTrendsLocations(
      userId,
      trendsLocationsDto
    );

    res.send(trends);
  }
);

export { router as twitterTrendsRouter };
