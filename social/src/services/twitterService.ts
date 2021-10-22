import { Service } from 'typedi';
import { UserIdDto } from '../utils/dtos/twitter/twitterUserIdDto';
import { TwitterDoc } from '../models/twitter';
import { UserRepository } from '../repositories/userRepository';
import { twitterErrorHandler } from '../utils/handleTwitterErrors';
import { TwitterApiService } from './twitterApiService';
import { TweetDto } from '../utils/dtos/twitter/tweetDto';
import { SearchDto } from '../utils/dtos/twitter/searchDto';
import { sentimentAnalysisService } from './sentimentAnalysisService';
import { RetweetDto } from '../utils/dtos/twitter/retweetDto';
import { LikeDto } from '../utils/dtos/twitter/likeDto';
import { HomeTimelineDto } from '../utils/dtos/twitter/homeTimelineDto';
import { RepliesDto } from '../utils/dtos/twitter/repliesDto';
import { TrendsDto } from '../utils/dtos/twitter/trendsDto';

@Service()
export class TwitterService {
  constructor(private readonly userRepository: UserRepository) {}

  async fetchConnectedAccounts(userId: string): Promise<TwitterDoc[]> {
    return await this.userRepository.fetchConnectedTwitterAccounts(userId);
  }

  async fetchCredentials(userId: string, twitterIdDto: UserIdDto) {
    const { twitterUserId } = twitterIdDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const user = await twitterApiService.fetchCredentials();
      if (user) {
        return user.data;
      }
    } catch (error) {
      twitterErrorHandler(error, twitterUserId);
    }
  }

  async tweet(userId: string, tweetDto: TweetDto): Promise<void> {
    const { status, twitterUserId, inReplyToStatusId } = tweetDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      await twitterApiService.tweet(status, inReplyToStatusId);
    } catch (error) {
      twitterErrorHandler(error, twitterUserId);
    }
  }

  async retweet(userId: string, retweetDto: RetweetDto) {
    const { tweetId, twitterUserId } = retweetDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.retweet(tweetId);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async unretweet(userId: string, retweetDto: RetweetDto) {
    const { tweetId, twitterUserId } = retweetDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.unretweet(tweetId);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async like(userId: string, likeDto: LikeDto) {
    const { tweetId, twitterUserId } = likeDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.like(tweetId);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async unlike(userId: string, likeDto: LikeDto) {
    const { tweetId, twitterUserId } = likeDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.unlike(tweetId);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async search(userId: string, searchDto: SearchDto) {
    const { search, maxId, twitterUserId } = searchDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const tweets = await twitterApiService.search(search, maxId);
      const statuses = await sentimentAnalysisService.injectSentimentIntoTweets(
        tweets.data.statuses
      );

      return statuses;
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async trends(userId: string, trendsDto: TrendsDto) {
    const { woeid, twitterUserId } = trendsDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const trends = await twitterApiService.trends(woeid);
      return trends.data[0];
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async homeTimeline(userId: string, homeTimelineDto: HomeTimelineDto) {
    const { maxId, twitterUserId } = homeTimelineDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const tweets = await twitterApiService.homeTimeline(maxId);
      const statuses = await sentimentAnalysisService.injectSentimentIntoTweets(
        tweets.data
      );

      return statuses;
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async replies(userId: string, repliesDto: RepliesDto) {
    const { twitterUserId } = repliesDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const tweets = await twitterApiService.replies(repliesDto);
      return await sentimentAnalysisService.injectSentimentIntoTweets(tweets);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  private async createTwitterApiService(userId: string, twitterUserId: string) {
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
    } = await this.userRepository.fetchTwitterAccountTokens(
      userId,
      twitterUserId
    );
    return new TwitterApiService(oauthAccessToken, oauthAccessTokenSecret);
  }
}
