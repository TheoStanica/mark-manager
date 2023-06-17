import { Service } from 'typedi';
import { UserIdDto } from '../utils/dtos/twitter/twitterUserIdDto';
import { TwitterDoc } from '../models/twitter';
import { UserRepository } from '../repositories/userRepository';
import { twitterErrorHandler } from '../utils/handleTwitterErrors';
import { TwitterApiService } from './twitterApiService';
import { TweetDto } from '../utils/dtos/twitter/tweetDto';
import { SearchDto } from '../utils/dtos/twitter/searchDto';
import { SentimentAnalysisService } from './sentimentAnalysisService';
import { RetweetDto } from '../utils/dtos/twitter/retweetDto';
import { LikeDto } from '../utils/dtos/twitter/likeDto';
import { HomeTimelineDto } from '../utils/dtos/twitter/homeTimelineDto';
import { RepliesDto } from '../utils/dtos/twitter/repliesDto';
import { TrendsDto } from '../utils/dtos/twitter/trendsDto';
import { TrendsLocationsDto } from '../utils/dtos/twitter/trendsLocationsDto';
import { TwitterAdsService } from './twitterAdsService';
import { TwitterRepository } from '../repositories/twitterRepository';
import { ScheduleTweetDto } from '../utils/dtos/twitter/scheduleTweetDto';
import { UpdateScheduledTweetDto } from '../utils/dtos/twitter/updateScheduledTweetDto';
import { DeleteScheduledTweetDto } from '../utils/dtos/twitter/deleteScheduledTweetDto';
import { FetchScheduledTweetsDto } from '../utils/dtos/twitter/fetchScheduledTweetsDto';
import { TwitterApiV2Service } from './twitterApiV2Service';
import { TweetV2, UserV2 } from 'twitter-api-v2';

@Service()
export class TwitterService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly twitterRepository: TwitterRepository
  ) {}

  async fetchCredentials(userId: string, twitterIdDto: UserIdDto) {
    const { twitterUserId } = twitterIdDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const user = await twitterApiService.fetchCredentials();
      if (user) {
        await this.synchronizeMediaAccount(
          userId,
          twitterUserId,
          user.data.name
        );
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

  async tweetv2(userId: string, tweetDto: TweetDto): Promise<void> {
    const { status, twitterUserId, inReplyToStatusId } = tweetDto;
    const twitterApiService = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );

    try {
      await twitterApiService.tweet(status);
    } catch (error) {
      console.log(error);
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

  async retweetV2(userId: string, retweetDto: RetweetDto) {
    const { tweetId, twitterUserId } = retweetDto;
    const twitterApiService = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.retweet(retweetDto.twitterUserId, tweetId);
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

  async unretweetV2(userId: string, retweetDto: RetweetDto) {
    const { tweetId, twitterUserId } = retweetDto;
    const twitterApiService = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiService.unretweet(
        retweetDto.twitterUserId,
        tweetId
      );
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

  async likeV2(userId: string, likeDto: LikeDto) {
    const { tweetId, twitterUserId } = likeDto;
    const twitterApiV2Service = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiV2Service.like(likeDto.twitterUserId, tweetId);
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

  async unlikeV2(userId: string, likeDto: LikeDto) {
    const { tweetId, twitterUserId } = likeDto;
    const twitterApiV2Service = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );
    try {
      return await twitterApiV2Service.unLike(likeDto.twitterUserId, tweetId);
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
      return await SentimentAnalysisService.injectSentimentIntoTweets(
        tweets.data.statuses
      );
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async searchV2(userId: string, searchDto: SearchDto) {
    const { search, maxId, twitterUserId } = searchDto;
    const twitterApiService = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );

    try {
      const result = await twitterApiService.search(search, maxId);
      return result;
      // const users = result.data.includes?.users || [];
      // const tweets = result.data.data.map((tweet) => {
      //   const _tweet = tweet as TweetV2 & { user?: UserV2 };
      //   _tweet.user = users.find((user) => user.id === tweet.author_id);

      //   return tweet;
      // });
      // return {
      //   meta: result.data.meta,
      //   data: {
      //     tweets,
      //     includes: result.data.includes,
      //   },
      // };
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

  async getTrendsLocations(
    userId: string,
    trendsLocationDto: TrendsLocationsDto
  ) {
    const { twitterUserId, lat, long } = trendsLocationDto;
    const twitterApiService = await this.createTwitterApiService(
      userId,
      twitterUserId
    );

    try {
      const locations = await twitterApiService.getTrendsLocations(lat, long);
      return locations.data;
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
      return await SentimentAnalysisService.injectSentimentIntoTweets(
        tweets.data
      );
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async homeTimelineV2(userId: string, homeTimelineDto: HomeTimelineDto) {
    const { maxId, twitterUserId } = homeTimelineDto;
    const twitterApiService = await this.createTwitterApiV2Service(
      userId,
      twitterUserId
    );

    try {
      const result = await twitterApiService.homeTimeline(maxId);
      return result;
      // const users = result.data.includes?.users || [];
      // const tweets = result.data.data.map((tweet) => {
      //   const _tweet = tweet as TweetV2 & { user?: UserV2 };
      //   _tweet.user = users.find((user) => user.id === tweet.author_id);

      //   return tweet;
      // });
      // return {
      //   meta: result.data.meta,
      //   data: {
      //     tweets,
      //     includes: result.data.includes,
      //   },
      // };
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
      return await SentimentAnalysisService.injectSentimentIntoTweets(tweets);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async fetchScheduledTweets(
    userId: string,
    fetchScheduledTweetdDto: FetchScheduledTweetsDto
  ) {
    const { twitterUserId, cursor } = fetchScheduledTweetdDto;
    const twitterAdsApiService = await this.createTwitterAdsApiService(
      userId,
      twitterUserId
    );

    try {
      return await twitterAdsApiService.fetchScheduledTweets(cursor);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async scheduleTweet(userId: string, scheduleTweetDto: ScheduleTweetDto) {
    const { twitterUserId } = scheduleTweetDto;
    const twitterAdsApiService = await this.createTwitterAdsApiService(
      userId,
      twitterUserId
    );

    try {
      return await twitterAdsApiService.createScheduledTweet(scheduleTweetDto);
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async updateScheduledTweet(
    userId: string,
    updateScheduledTweetDto: UpdateScheduledTweetDto
  ) {
    const { twitterUserId } = updateScheduledTweetDto;
    const twitterAdsApiService = await this.createTwitterAdsApiService(
      userId,
      twitterUserId
    );
    try {
      return await twitterAdsApiService.updateScheduledTweet(
        updateScheduledTweetDto
      );
    } catch (error) {
      twitterErrorHandler(error, String(twitterUserId));
    }
  }

  async deleteScheduledTweet(
    userId: string,
    deleteScheduledTweetDto: DeleteScheduledTweetDto
  ) {
    // const { twitterUserId } = deleteScheduledTweetDto;
    // const twitterAdsApiService = await this.createTwitterAdsApiService(
    //   userId,
    //   twitterUserId
    // );
    // try {
    //   return await twitterAdsApiService.deleteScheduledTweet(
    //     deleteScheduledTweetDto
    //   );
    // } catch (error) {
    //   twitterErrorHandler(error, String(twitterUserId));
    // }
  }

  private async createTwitterApiService(userId: string, twitterUserId: string) {
    const { oauthAccessToken, oauthAccessTokenSecret } =
      await this.userRepository.fetchTwitterAccountTokens(
        userId,
        twitterUserId
      );
    return new TwitterApiService(oauthAccessToken, oauthAccessTokenSecret);
  }

  private async createTwitterApiV2Service(
    userId: string,
    twitterUserId: string
  ) {
    const { oauthAccessToken, oauthAccessTokenSecret } =
      await this.userRepository.fetchTwitterAccountTokens(
        userId,
        twitterUserId
      );
    return new TwitterApiV2Service(oauthAccessToken, oauthAccessTokenSecret);
  }

  private async createTwitterAdsApiService(
    userId: string,
    twitterUserId: string
  ) {
    const { oauthAccessToken, oauthAccessTokenSecret, adsId } =
      await this.userRepository.fetchTwitterAccountTokens(
        userId,
        twitterUserId
      );
    return new TwitterAdsService(
      oauthAccessToken,
      oauthAccessTokenSecret,
      adsId
    );
  }

  private async synchronizeMediaAccount(
    userId: string,
    twitterUserId: string,
    name: string
  ) {
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
      id: twitterAccountMongoId,
      adsId,
    } = await this.userRepository.fetchTwitterAccountTokens(
      userId,
      twitterUserId
    );
    const twitterAdsApiService = new TwitterAdsService(
      oauthAccessToken,
      oauthAccessTokenSecret,
      adsId
    );
    try {
      const adsAccounts = await twitterAdsApiService.fetchMediaAccounts(name);

      if (adsAccounts.data[0]?.id) {
        await this.twitterRepository.addMediaAccount(
          twitterAccountMongoId,
          adsAccounts.data[0].id
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
