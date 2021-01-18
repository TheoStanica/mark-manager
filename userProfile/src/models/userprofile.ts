import mongoose from 'mongoose';

export interface UserAttrs {
  _id: string;
  email: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  fullName?: string | undefined;
  profilePicture?: string | undefined;
  userTier?: string;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

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
