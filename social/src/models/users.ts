import mongoose from 'mongoose';
import { FacebookDoc } from './facebook';
import { TwitterDoc } from './twitter';

export interface UserAttrs {
  _id: string;
}

export interface UserDoc extends mongoose.Document {
  twitter: Array<TwitterDoc>;
  facebook: Array<FacebookDoc>;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  twitter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TwitterAccount',
    },
  ],
  facebook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FacebookAccount',
    },
  ],
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
