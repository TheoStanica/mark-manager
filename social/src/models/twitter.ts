import mongoose from 'mongoose';

export interface TwitterAttrs {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterUserId: string;
  twitterScreenName: string;
}

export interface TwitterDoc extends mongoose.Document {
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  twitterUserId: string;
  twitterScreenName: string;
  adsId: string;
  hasAdsAccount: boolean;
}

export interface TwitterModel extends mongoose.Model<TwitterDoc> {
  build(attrs: TwitterAttrs): TwitterDoc;
}

const twitterAccountSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.id;
        delete ret.__v;
        delete ret.oauthAccessToken;
        delete ret.oauthAccessTokenSecret;
        delete ret.adsId;
      },
    },
  }
);

twitterAccountSchema.statics.build = (attrs: TwitterAttrs) => {
  return new Twitter(attrs);
};

const Twitter = mongoose.model<TwitterDoc, TwitterModel>(
  'TwitterAccount',
  twitterAccountSchema
);

export { Twitter };
