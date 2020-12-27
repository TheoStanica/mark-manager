import mongoose from 'mongoose';

export interface UserAttrs {
  _id: string;
  email: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  fullName: string;
  profilePicture: string;
  userTier: string;
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
    profilePicture: {
      type: String,
    },
    userTier: {
      type: String,
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
