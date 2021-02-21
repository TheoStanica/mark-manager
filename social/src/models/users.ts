import mongoose from 'mongoose';

export interface UserAttrs {
  _id: string;
}

export interface UserDoc extends mongoose.Document {
  twitter: {
    oauthAccessToken: string | null;
    oauthAccessTokenSecret: string | null;
  };
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    twitter: {
      oauthAccessToken: {
        type: String,
      },
      oauthAccessTokenSecret: {
        type: String,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
