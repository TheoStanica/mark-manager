import mongoose from 'mongoose';
import { IStreamPreference } from '../utils/interfaces/streamPreference';

export interface UserAttrs {
  _id: string;
  email: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  fullName: string | undefined;
  profilePicture: string | undefined;
  userTier: string;
  stream_preferences: IStreamPreference<unknown>[];
  themePreference?: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const streamPreferenceDataSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['home_timeline', 'search'],
    required: true,
  },
  search: {
    type: String,
    required: false,
  },
  twitterUserId: {
    type: String,
    required: true,
  },
});

const streamPreferenceSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['twitter'],
    required: true,
  },
  data: {
    type: streamPreferenceDataSchema,
    required: true,
  },
});

const userProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default:
        'https://projectmarkbucket.s3.eu-west-3.amazonaws.com/default_profile.jpg',
    },
    userTier: {
      type: String,
      default: 'free',
    },
    stream_preferences: [
      {
        type: streamPreferenceSchema,
      },
    ],
    themePreference: {
      type: String,
      default: 'light',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userProfileSchema.statics.build = (attrs: UserAttrs) => {
  return new UserProfile(attrs);
};

const UserProfile = mongoose.model<UserDoc, UserModel>(
  'UserProfile',
  userProfileSchema
);

export { UserProfile };
