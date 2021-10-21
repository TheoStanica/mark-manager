import { Service } from 'typedi';
import { UserIdDto } from '../utils/dtos/twitter/twitterUserIdDto';
import { TwitterDoc } from '../models/twitter';
import { UserRepository } from '../repositories/userRepository';
import { handleTwitterErrors } from './handleTwitterErrors';
import { TwitterApiService } from './twitterApiService';
import { TweetDto } from '../utils/dtos/twitter/tweetDto';
import { SearchDto } from '../utils/dtos/twitter/searchDto';
import { sentimentAnalysisService } from './sentimentAnalysisService';
import { RetweetDto } from '../utils/dtos/twitter/retweetDto';
import { LikeDto } from '../utils/dtos/twitter/likeDto';

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async fetchConnectedTwitterAccounts(userId: string): Promise<TwitterDoc[]> {
    return await this.userRepository.fetchConnectedTwitterAccounts(userId);
  }

  async fetchTwitterCredentials(userId: string, twitterIdDto: UserIdDto) {
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
      handleTwitterErrors(error, twitterUserId);
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
      handleTwitterErrors(error, twitterUserId);
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
      handleTwitterErrors(error, String(twitterUserId));
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
      handleTwitterErrors(error, String(twitterUserId));
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
      handleTwitterErrors(error, String(twitterUserId));
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
      handleTwitterErrors(error, String(twitterUserId));
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
      const statuses = sentimentAnalysisService.injectSentimentIntoTweets(
        tweets.data.statuses
      );

      return statuses;
    } catch (error) {
      handleTwitterErrors(error, String(twitterUserId));
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
