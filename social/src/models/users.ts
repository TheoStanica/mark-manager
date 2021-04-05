import mongoose from 'mongoose';
import { TwitterDoc } from './twitter';

export interface UserAttrs {
  _id: string;
}

export interface UserDoc extends mongoose.Document {
  twitter: TwitterDoc[];
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    twitter: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TwitterAccount',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
