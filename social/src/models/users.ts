import mongoose from 'mongoose';
import { FacebookDoc } from './facebook';
import { TwitterDoc } from './twitter';

export interface UserAttrs {
  _id: string;
}

export interface UserDoc extends mongoose.Document {
  twitter: Array<TwitterDoc>;
  facebook: any;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  twitter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TwitterAccount',
      required: false,
    },
  ],
  facebook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FacebookAccount',
      required: false,
    },
  ],
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.set('versionKey', false);

userSchema.set('strict', false);

// @ts-ignore
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
