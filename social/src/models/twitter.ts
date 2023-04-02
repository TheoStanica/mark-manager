import mongoose from 'mongoose';

export interface TwitterAttrs {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterUserId: string;
  twitterScreenName: string;
}

export interface TwitterDoc {
  id: string;
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterUserId: string;
  twitterScreenName: string;
  adsId: string;
  hasAdsAccount: boolean;
}

export interface TwitterModel
  extends mongoose.Model<TwitterDoc & mongoose.Document> {
  build(attrs: TwitterAttrs): TwitterDoc & mongoose.Document;
}

const twitterAccountSchema = new mongoose.Schema({
  oauthAccessToken: {
    type: String,
  },
  oauthAccessTokenSecret: {
    type: String,
  },
  twitterScreenName: {
    type: String,
  },
  twitterUserId: {
    type: String,
  },
  adsId: {
    type: String,
  },
  hasAdsAccount: {
    type: Boolean,
    default: false,
  },
});

twitterAccountSchema.statics.build = (attrs: TwitterAttrs) => {
  return new Twitter(attrs);
};

const Twitter = mongoose.model<TwitterDoc & mongoose.Document, TwitterModel>(
  'TwitterAccount',
  twitterAccountSchema
);

export { Twitter };
